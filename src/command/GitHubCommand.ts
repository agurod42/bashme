import { ParsedArgs } from 'minimist';

import { HelpTopic } from '../helpTopic';
import { AsyncCommand } from './types';

export class GitHubCommand extends AsyncCommand {

    public name: string = 'github';
    public description: string = 'shows GitHub profile information';
    public helpTopic: HelpTopic;
    public subCommands: { [key: string]: AsyncCommand } = {};

    constructor() {
        super();
        
        this.helpTopic = new HelpTopic(this, {
             synopsis: 'github'
        });

        this.subCommands['repos'] = new GitHubReposSubCommand();
    }

    run(args: ParsedArgs): Promise<void> {
        return Promise.resolve();
    }

}

class GitHubReposSubCommand extends AsyncCommand {

    public name: string = 'github';
    public description: string = 'shows GitHub owned repositories';
    public helpTopic: HelpTopic;
    public subCommands: { [key: string]: AsyncCommand } = {};

    constructor() {
        super();

        this.helpTopic = new HelpTopic(this, {
             synopsis: 'github repos'
        });
    }

    run(args: ParsedArgs): Promise<void> {
        return Promise.resolve();
    }

}