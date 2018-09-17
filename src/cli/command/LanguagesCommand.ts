import * as minimist from 'minimist';

import { Language } from '../../resume/properties';
import { HelpTopic } from '../helpTopic';
import { Command } from '.';

export class LanguagesCommand implements Command<Language> {

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

    run(args: minimist.ParsedArgs): Array<Language> {
        let data = this.languages;

        if (args.l) {
            data = data.filter((l) => l.level === args.l);
        }

        return data;
    }

}