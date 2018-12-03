import { ParsedArgs } from 'minimist';

import { SyncCommand } from '..';

export class DebugSubCommand implements SyncCommand {

    public name: string = 'test';
    public description: string = 'command used to debug subcommands';

    run(args: ParsedArgs): object {
        return { 'debug': 'subcommand', ...args };
    }

}