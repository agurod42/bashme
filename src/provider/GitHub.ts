import { GitHubCommand } from '../command';
import { TCommand } from '../command/types';
import { IProvider } from './types';

export class GitHub implements IProvider {

    private authToken: string;

    constructor(token: string) {
        this.authToken = token;
    }

    getCommands(): Array<TCommand> {
        return [
            new GitHubCommand(this.authToken)
        ];
    }

}