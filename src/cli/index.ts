import Table from 'cli-table2';
import EasyTable from 'easy-table';
import minimist from 'minimist';
import { Terminal } from 'xterm';
import { fit } from 'xterm/lib/addons/fit/fit';
import { webLinksInit } from 'xterm/lib/addons/webLinks/webLinks';

import { Command, CommandOutput } from './command';
import { HelpTopic } from './helpTopic';

export class Cli {

    private commands: { [key: string]: Command<any>; } = {};
    private helpTopics: { [key: string]: HelpTopic } = {};

    private buffer: string = '';
    private cursorOffset: number = 0;
    private terminal: Terminal;
    private terminalPrompt: string = 'bashme$ ';
    private terminalHistory: Array<string> = [];
    private terminalHistoryIndex = 0;

    constructor() {
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
                    this.parseInput();
                    this.prompt();
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

    private parseInput() {
        let buffer = this.buffer.trim();

        if (buffer) {
            let args = minimist(buffer.split(' '));
            let cmdName = args._[0];
            let cmd = this.commands[cmdName];
            
            if (cmdName === 'help') {
                args._[1] ? this.showHelpTopic(args._[1]) : this.showHelp();
            }
            else if (cmd) {
                let output = cmd.run(args);
                this.write(`\r\n${this.processOutput(output)}`);
            }
            else {
                this.write(`\r\n${cmdName}: command not found`);
            }

            this.terminalHistory.push(buffer);
            this.terminalHistoryIndex = this.terminalHistory.length;
        }
        
        this.cursorOffset = 0;
        this.buffer = '';
    }

    private processOutput(output: CommandOutput): string {
        if (typeof output === 'object') {
            if (Array.isArray(output)) {
                // print as table
                if (!output.length) return '';

                let cols = Object.keys(output[0]).length;
                let colWidths = Array(cols).fill(Math.floor((this.terminal.cols - 6) / cols));

                let table = new Table({
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
            else {
                // print as json
                return JSON.stringify(output, null, 2);
            }
        }
        else {
            return output.toString();
        }
    }

    private prompt(newLine: boolean = true) {
        this.terminal.write(`${newLine ? '\r\n' : ''}${this.terminalPrompt}`);
    }

    private showHelp() {
        let table = new EasyTable();
        table.separator = '\t\t';

        for (let i in this.commands) {
            table.cell('name', this.commands[i].name);
            table.cell('description', this.commands[i].description);
            table.newRow();
        }
        
        this.terminal.write('\r\n\r\nThese commands are defined.\r\nType `help name` to find out more about the function `name`.\r\n\r\n\t' + table.print().replace(/\r?\n/g, '\r\n\t'));
    }

    private showHelpTopic(cmdName: string) {
        if (this.helpTopics[cmdName]) {
            this.write('\r\n\r\n' + this.helpTopics[cmdName] + '\r\n');
        }
        else {
            this.write(`\r\nno help topics match \`${cmdName}\``);
        }
    }

    register(command: Command<any>) {
        this.commands[command.name] = command;

        if (command.helpTopic) {
            this.helpTopics[command.name] = command.helpTopic;
        }
    }

    show(domElement: HTMLElement) {
        this.terminal.open(domElement);
        this.terminal.focus();
        this.prompt(false);

        fit(this.terminal);
        webLinksInit(this.terminal);
    }

    write(str: string) {
        this.terminal.write(str);
    }

}