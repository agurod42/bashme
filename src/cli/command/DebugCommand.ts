import minimist from 'minimist';

import { Command } from '.';
import { HelpTopic } from '../helpTopic';

export class DebugCommand implements Command<any> {

    public name: string = 'debug';
    public description: string = 'Command used to debug';
    public helpTopic: HelpTopic;

    constructor() {
        this.helpTopic = new HelpTopic(this, {
             
        });
    }

    run(args: minimist.ParsedArgs): object {
        return args;
    }

}