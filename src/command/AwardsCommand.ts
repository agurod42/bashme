import { ParsedArgs } from 'minimist';

import { HelpTopic } from '../helpTopic';
import { Award } from '../property';
import { SyncCommand } from './types';

export class AwardsCommand extends SyncCommand {

    private awards: Array<Award>;

    public name: string = 'awards';
    public description: string = 'shows awards';
    public helpTopic: HelpTopic;

    constructor(awards: Array<Award>) {
        super();
        this.awards = awards;
        this.helpTopic = new HelpTopic(this, {
            synopsis: 'awards [-y]',
            options: {
                '-y': 'List all awards earned in the -y year'
            },
            examples: [
                {
                    cmd: 'awards -y 2018',
                    description: 'The following command shows all awards earned in the 2018 year'
                }
            ]
        });
    }

    run(args: ParsedArgs): Array<Award> {
        let data = this.awards;

        if (args.y) {
            data = data.filter((a) => a.year == args.y);
        }

        return data;
    }

}