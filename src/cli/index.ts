import Vorpal = require('vorpal');

import { Command } from './command';

export class Cli {

    private vorpal: Vorpal;

    constructor() {
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

    show() {
        this.vorpal.show();
    }

}