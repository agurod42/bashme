import Octokit from '@octokit/rest';
import { ParsedArgs } from 'minimist';

import { HelpTopic } from '../helpTopic';
import { AsyncCommand } from './types';

export class GitHubCommand extends AsyncCommand {

    private octokit: Octokit;

    public name: string = 'github';
    public description: string = 'shows GitHub profile information';
    public helpTopic: HelpTopic;
    public subCommands: { [key: string]: AsyncCommand } = {};

    constructor(authToken: string) {
        super();

        this.octokit = new Octokit();
        this.octokit.authenticate({ type: 'token', token: authToken });
        
        this.helpTopic = new HelpTopic(this, {
             synopsis: 'github'
        });

        this.subCommands['repos'] = new GitHubReposSubCommand(this.octokit);
    }

    run(args: ParsedArgs): Promise<any> {
        return  this.octokit
                    .users
                    .getAuthenticated({})
                    .then((res: any) => {
                        return {
                            name: res.data.name,
                            url: res.data.html_url,
                            email: res.data.email,
                            followers: res.data.followers,
                            public_repos: res.data.public_repos,
                            private_repos: res.data.total_private_repos
                        };
                    });
    }

}

class GitHubReposSubCommand extends AsyncCommand {

    private octokit: Octokit;

    public name: string = 'github';
    public description: string = 'shows GitHub owned repositories';
    public helpTopic: HelpTopic;
    public subCommands: { [key: string]: AsyncCommand } = {};

    constructor(octokit: Octokit) {
        super();

        this.octokit = octokit;

        this.helpTopic = new HelpTopic(this, {
            synopsis: 'github repos [-l]',
            options: {
                '-l': 'List all repos written in a specified language'
            },
            examples: [
                {
                    cmd: 'github repos -l C++',
                    description: 'The following command shows all owned GitHub repos written in C++ language'
                }
            ]
        });
    }

    run(args: ParsedArgs): Promise<any> {
        return  this.octokit
                    .repos
                    .list({ sort: 'updated' })
                    .then(res => {
                        let data = res.data.map((repo: any) => ({
                            name: repo.full_name,
                            language: repo.language || 'undefined',
                            stars: repo.stargazers_count,
                            forks: repo.forks_count,
                            last_updated: repo.updated_at
                        }));

                        if (args.l) {
                            data = data.filter((i: any) => i.language.indexOf(args.l) >= 0);
                        }

                        return data;
                    });
    }

}