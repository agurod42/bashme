import { ParsedArgs } from 'minimist';

import { HelpTopic } from '../helpTopic';
import { Publication } from '../property';
import { SyncCommand } from './types';

export class PublicationsCommand extends SyncCommand {

    private publications: Array<Publication>;

    public name: string = 'publications';
    public description: string = 'shows publications';
    public helpTopic: HelpTopic;

    constructor(publications: Array<Publication>) {
        super();
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

    run(args: ParsedArgs): Array<Publication> {
        let data = this.publications;

        if (args.y) {
            data = data.filter((p) => p.releaseYear <= args.y);
        }

        return data;
    }

}