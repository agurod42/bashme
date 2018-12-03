import { ParsedArgs } from 'minimist';

import { Language } from '../../resume/properties';
import { HelpTopic } from '../helpTopic';
import { SyncCommand } from '.';

export class LanguagesCommand implements SyncCommand {

    private languages: Array<Language>;

    public name: string = 'languages';
    public description: string = 'shows languages';
    public helpTopic: HelpTopic;

    constructor(languages: Array<Language>) {
        this.languages = languages;
        this.helpTopic = new HelpTopic(this, {
            synopsis: 'languages [-l]',
            options: {
                '-l': 'List all languages in which the level is -l'
            },
            examples: [
                {
                    cmd: 'languages -l proficient',
                    description: 'The following command shows all languages in which the level is proficient'
                }
            ]
        });
    }

    run(args: ParsedArgs): Array<Language> {
        let data = this.languages;

        if (args.l) {
            data = data.filter((l) => l.level === args.l);
        }

        return data;
    }

}