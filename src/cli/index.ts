import minimist from 'minimist';
import { Terminal } from 'xterm';
import { fit } from 'xterm/lib/addons/fit/fit';

import { Command } from './command';

export class Cli {

    private commands: { [key: string]: Command<any>; } = {};

    private buffer: string = '';
    private cursorOffset: number = 0;
    private terminal: Terminal;
    private terminalPrompt: string = '> ';
    private terminalHistory: Array<string> = [];
    private terminalHistoryIndex = 0;

    constructor() {
        this.terminal = new Terminal({
            cursorBlink: true,
            cursorStyle: 'underline'
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
            
            if (cmd) {
                let res = cmd.action();
                let output = JSON.stringify(res, null, 2).replace(/\r?\n/g, '\r\n');
                this.terminal.write(`\r\n${output}`);
            }
            else {
                this.showHelp();
            }

            this.terminalHistory.push(buffer);
            this.terminalHistoryIndex = this.terminalHistory.length;
        }
        
        this.cursorOffset = 0;
        this.buffer = '';
    }

    private prompt(newLine: boolean = true) {
        this.terminal.write(`${newLine ? '\r\n' : ''}${this.terminalPrompt}`);
    }

    private showHelp() {
        
    }

    register(command: Command<any>) {
        this.commands[command.name] = command;
    }

    show(domElement: HTMLElement) {
        this.terminal.open(domElement);
        this.prompt(false);

        fit(this.terminal);
    }

}