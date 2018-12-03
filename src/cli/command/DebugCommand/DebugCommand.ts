import { ParsedArgs } from 'minimist';

import { DebugSubCommand } from './DebugSubCommand';
import { SyncCommand } from '..';
import { HelpTopic } from '../../helpTopic';

export class DebugCommand implements SyncCommand {

    public name: string = 'debug';
    public description: string = 'command used to debug';
    public helpTopic: HelpTopic;
    public subCommands: { [key: string]: SyncCommand } = {};

    constructor() {
        this.helpTopic = new HelpTopic(this, {
             synopsis: 'debug'
        });

        this.subCommands['test'] = new DebugSubCommand();
    }

    run(args: ParsedArgs): object {
        return args;
    }

}