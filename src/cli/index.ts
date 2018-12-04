import Table from 'cli-table2';
import EasyTable from 'easy-table';
import { EventEmitter } from 'events';
import * as minimist from 'minimist';
import { Terminal } from 'xterm';
import { fit } from 'xterm/lib/addons/fit/fit';
import { webLinksInit } from 'xterm/lib/addons/webLinks/webLinks';

import { AsyncCommand, TCommand, TCommandOutput } from '../command/types';
import { HelpTopic } from '../helpTopic';

const EOL = '\r\n';

export interface CliOptions {
    prompt?: string,
    welcomeMessage?: string
}

export class Cli extends EventEmitter {

    private commands: { [key: string]: TCommand; } = {};
    private helpTopics: { [key: string]: HelpTopic } = {};

    private buffer: string = '';
    private commandRunning: boolean = false;
    private cursorOffset: number = 0;
    private options: CliOptions = { prompt: '> ' };
    private terminal: Terminal;
    private terminalHistory: Array<string> = [];
    private terminalHistoryIndex = 0;

    constructor(options?: CliOptions) {
        super();

        if (options) {
            Object.assign(this.options, options);
        }

        this.terminal = new Terminal({
            convertEol: true,
            cursorBlink: true,
            cursorStyle: 'underline',
            fontFamily: 'Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace',
            fontSize: 12
        });
        
        this.terminal.on('key', (d) => this.input(d!));
        this.terminal.on('paste', (d) => this.input(d!));
    }

    private input(str: string) {
        for (var i = 0; i < str.length; i++) {
            //console.log(str.charCodeAt(i))
            switch (str.charCodeAt(i)) {
                case 8: // backspace
                    if (this.cursorOffset === 0) break;
                    this.cursorOffset--;
                    this.buffer = this.buffer.substr(0, this.cursorOffset) + this.buffer.substr(this.cursorOffset + 1);
                    this.terminal.write('\b \b');
                    break;
                case 127: // del
                    if (this.cursorOffset === 0) break;
                    // TODO: change it so it works outside browser too
                    if (navigator.platform.indexOf('Mac') >= 0) {
                        this.cursorOffset--;
                        this.buffer = this.buffer.substr(0, this.cursorOffset) + this.buffer.substr(this.cursorOffset + 1);
                        this.terminal.write('\b \b');
                    }
                    break;
                case 13: // enter
                    this.terminal.write(EOL);
                    this.processInput();
                    break;
                case 65: // up
                    var cmd = this.terminalHistory[this.terminalHistoryIndex - 1];
                    if (cmd) {
                        this.terminalHistoryIndex--;
                        this.terminal.write(Array(this.buffer.length + 1).join('\b \b'));
                        this.terminal.write(cmd);
                        this.cursorOffset = cmd.length;
                        this.buffer = cmd;
                    }
                    break;
                case 66: // down
                    var cmd = this.terminalHistory[this.terminalHistoryIndex + 1];
                    if (cmd) {
                        this.terminalHistoryIndex++;
                        this.terminal.write(Array(this.buffer.length + 1).join('\b \b'));
                        this.terminal.write(cmd);
                        this.cursorOffset = cmd.length;
                        this.buffer = cmd;
                    }
                    break;
                case 67: // right
                case 68: // left
                    if (str.charCodeAt(i) === 67) this.cursorOffset++;
                    if (str.charCodeAt(i) === 68) this.cursorOffset--;
                    this.terminal.write(String.fromCharCode(27) + String.fromCharCode(91) + str[i]);
                    break;
                case 27:
                case 91:
                    // skip
                    break;
                default:
                    var rest = this.buffer.substr(this.cursorOffset);
                    this.buffer = this.buffer.substr(0, this.cursorOffset) + str[i] + rest;
                    this.cursorOffset++;
                    this.terminal.write(str[i] + rest + Array(rest.length + 1).join('\b'));
                    break;
            }
        }
    }

    private processInput() {
        if (this.commandRunning) return;

        let buffer = this.buffer.trim();

        if (buffer) {
            this.emit('input', buffer);

            let args = minimist.default(buffer.split(' '));
            let argsQueue = args._.slice(0);
            let command: TCommand | undefined = undefined;
            let commands = this.commands;

            while (argsQueue.length) {
                let arg = argsQueue.shift();
                
                if (!arg) break;
                if (!commands[arg]) break; 

                command = commands[arg];
                // @ts-ignore
                commands = command.subCommands;

                if (!commands) break;
            }
            
            if (command !== undefined) {
                this.commandRunning = true;
                this.processCommand(command, { ...args, _: argsQueue })
                    .catch((err) => {
                        this.commandRunning = false;
                        this.write(`ERR! ${this.processCommandOutput(err)}`);
                        this.prompt();
                    })
                    .then(output => {
                        this.commandRunning = false;
                        this.write(`${this.processCommandOutput(output)}`);
                        if (buffer !== 'clear') this.write(EOL);
                        this.prompt();
                    });
            }
            else {
                this.write(`${args._[0]}: command not found${EOL}`);
            }

            this.terminalHistory.push(buffer);
            this.terminalHistoryIndex = this.terminalHistory.length;
        }
        
        this.cursorOffset = 0;
        this.buffer = '';

        if (!this.commandRunning) {
            this.prompt();
        }
    }

    private processCommand(command: TCommand, args: minimist.ParsedArgs): Promise<TCommandOutput> {
        if (command instanceof AsyncCommand) {
            return (<AsyncCommand>command).run(args);
        }
        else {
            return Promise.resolve(command.run(args));
        }
    }

    private processCommandOutput(output: TCommandOutput): string {
        if (typeof output === 'object') {
            if (Array.isArray(output)) {
                // print as table
                return this.processCommandOutputAsTable(output);
            }
            else {
                // print as json
                return JSON.stringify(output, null, 2);
            }
        }
        else {
            let o = <any>output;
            return o || '';
        }
    }

    private processCommandOutputAsTable(output: Array<any>): string {
        if (!output.length) return '';

        // try to estimate the maximun row width 
        let estimatedMaxRowWidth = 0;
        let strlen = (o: any) => ('' + o).length;

        try {
            output.forEach(item => {
                let estimatedRowWidth = 1;
                for (let k in item) {
                    estimatedRowWidth += strlen(item[k]) + 3;
                }
                if (estimatedRowWidth > estimatedMaxRowWidth) {
                    estimatedMaxRowWidth = estimatedRowWidth;
                }
            });
        }
        catch (err) {
        }

        let colWidths = [];

        // if it's needed calculate the last column's width so the entire table fits in the terminal 
        if (estimatedMaxRowWidth > this.terminal.cols) {
            let cols = Object.keys(output[0]).length;
            colWidths = Array(cols).fill(Math.floor(this.terminal.cols / cols - 1));
            colWidths[cols - 1] += this.terminal.cols % cols - 1;
        }

        let table = new Table({
            chars: {
                'top': ' ','top-mid': ' ', 'top-left': ' ', 'top-right': ' ',
                'bottom': ' ','bottom-mid': ' ', 'bottom-left': ' ', 'bottom-right': ' ',
                'mid': '-', 'mid-mid': '|', 'middle': '|',
                'left': ' ', 'left-mid': ' ',
                'right': ' ', 'right-mid': ' '
            },
            colWidths: colWidths,
            head: Object.keys(output[0]),
            wordWrap: true,
        });
        
        output.forEach(item => {
            // @ts-ignore
            table.push(Object.values(item));
        });
        
        return table.toString();
    }

    private prompt() {
        this.terminal.write(`${this.options.prompt}${this.buffer}`);
    }

    clear() {
        this.terminal.reset();
    }

    // TODO: Move to HelpCommand
    help() {
        let table = new EasyTable();
        table.separator = '\t\t';

        for (let i in this.commands) {
            table.cell('name', this.commands[i].name);
            table.cell('description', this.commands[i].description);
            table.newRow();
        }
        
        this.terminal.write(`${EOL}These commands are defined.${EOL}Type \`help name\` to find out more about the function \`name\`.${EOL}${EOL}\t${table.print().replace(/\r?\n/g, `${EOL}\t`)}`);
    }

    // TODO: Move to HelpCommand
    helpTopic(cmdName: string) {
        if (this.helpTopics[cmdName]) {
            this.write(`${EOL}${this.helpTopics[cmdName]}${EOL}`);
        }
        else {
            this.write(`no help topics match \`${cmdName}\``);
        }
    }

    register(command: TCommand) {
        this.commands[command.name] = command;

        if (command.helpTopic) {
            this.helpTopics[command.name] = command.helpTopic;
        }
    }

    show(domElement: HTMLElement) {
        this.terminal.open(domElement);
        this.terminal.focus();

        if (this.options.welcomeMessage && this.options.welcomeMessage.length) {
            this.write(`${this.options.welcomeMessage}${EOL}${EOL}`);
        }

        this.prompt();

        fit(this.terminal);
        webLinksInit(this.terminal);

        window.onresize = () => fit(this.terminal);
    }

    write(str: string) {
        this.terminal.write(str);
    }

}