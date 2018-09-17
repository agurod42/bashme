import * as minimist from 'minimist';

import { Publication } from '../../resume/properties';
import { HelpTopic } from '../helpTopic';
import { Command } from '.';

export class PublicationsCommand implements Command<Publication> {

    private publications: Array<Publication>;

    public name: string = 'publications';
    public description: string = 'shows publications';
    public helpTopic: HelpTopic;

    constructor(publications: Array<Publication>) {
        this.publications = publications;
        this.helpTopic = new HelpTopic(this, {
            synopsis: 'publications [-y]',
            options: {
                '-y': 'List all publications released in the -y year'
            },
            examples: [
                {
                    cmd: 'publications -y 2018',
                    description: 'The following command shows all publications released in the 2018 year'
                }
            ]
        });
    }

    run(args: minimist.ParsedArgs): Array<Publication> {
        let data = this.publications;

        if (args.y) {
            data = data.filter((p) => p.releaseYear <= args.y);
        }

        return data;
    }

}