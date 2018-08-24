import Vorpal = require('vorpal');
import { Terminal } from 'xterm';

import { Command } from './command';

export class Cli {

    private terminal: Terminal;
    private vorpal: Vorpal;

    constructor() {
        this.terminal = new Terminal();
        this.vorpal = new Vorpal();
        this.vorpal.delimiter('~>');
    }

    register(command: Command<any>) {
        this.vorpal
            .command(command.name, command.description)
            .action((args, callback) => {
                command.action(args);
                callback();
            });
    }

    show(domElement: HTMLElement) {
        this.terminal.on('data', (data) => {
            this.vorpal.exec(data, (res: any) => {
                this.terminal.writeln(res);
            });
        })
        
        this.terminal.open(domElement);
    }

}