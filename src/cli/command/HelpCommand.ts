import minimist from 'minimist';

import { Command } from '.';
import { Cli } from '../../cli';

export class HelpCommand implements Command<any> {

    private cli: Cli;

    public name: string = 'help';
    public description: string = '';

    constructor(cli: Cli) {
        this.cli = cli;
    }

    run(args: minimist.ParsedArgs): void {
        if (args._.length > 0) {
            this.cli.helpTopic(args._[0]);
        }
        else {
            this.cli.help();
        }
    }

}