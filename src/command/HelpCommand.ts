import { ParsedArgs } from 'minimist';

import { Cli } from '../cli';
import { SyncCommand } from './types';

export class HelpCommand extends SyncCommand {

    private cli: Cli;

    public name: string = 'help';
    public description: string = 'shows this help screen';

    constructor(cli: Cli) {
        super();
        this.cli = cli;
    }

    run(args: ParsedArgs): void {
        if (args._.length > 0) {
            this.cli.helpTopic(args._[0]);
        }
        else {
            this.cli.help();
        }
    }

}