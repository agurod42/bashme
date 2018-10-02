import * as minimist from 'minimist';

import { Command, SubCommand } from '.';

export class DebugSubCommand implements SubCommand<any> {

    public name: string = 'test';
    public description: string = 'command used to debug subcommands';
    public parent: Command<any>;

    constructor(parent: Command<any>) {
        this.parent = parent;
    }

    run(args: minimist.ParsedArgs): object {
        return { 'debug': 'subcommand', ...args };
    }

}