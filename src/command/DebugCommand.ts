import { ParsedArgs } from 'minimist';

import { HelpTopic } from '../helpTopic';
import { SyncCommand } from './types';

export class DebugCommand extends SyncCommand {

    public name: string = 'debug';
    public description: string = 'command used to debug';
    public helpTopic: HelpTopic;
    public subCommands: { [key: string]: SyncCommand } = {};

    constructor() {
        super();
        
        this.helpTopic = new HelpTopic(this, {
             synopsis: 'debug'
        });

        this.subCommands['test'] = new DebugSubCommand();
    }

    run(args: ParsedArgs): object {
        return args;
    }

}

class DebugSubCommand extends SyncCommand {

    public name: string = 'test';
    public description: string = 'command used to debug subcommands';

    run(args: ParsedArgs): object {
        return { 'debug': 'subcommand', ...args };
    }

}