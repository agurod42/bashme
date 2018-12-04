import Octokit from '@octokit/rest';

import { AnyPromiseCommand } from '../command';
import { TCommand } from '../command/types';
import { IProvider } from './types';

export class GitHub implements IProvider {

    private octokit: Octokit;

    constructor(token: string) {
        this.octokit = new Octokit();
        this.octokit.authenticate({ type: 'token', token: token });
    }

    getRepos(): Promise<any> {
        return this.octokit.repos.list({}).then(repos => {
            return repos;
        });
    }

    getCommands(): Array<TCommand> {
        let commands: Array<TCommand> = [];

        commands.push(new AnyPromiseCommand("github", "github", new Promise((resolve, reject) => {
            this.getRepos().then(resolve);
        })));

        return commands;
    }

}