import minimist from 'minimist';

import { Award } from '../../resume/properties';
import { HelpTopic } from '../helpTopic';
import { Command } from '.';

export class AwardsCommand implements Command<Award> {

    private awards: Array<Award>;

    public name: string = 'awards';
    public description: string = 'shows awards';
    public helpTopic: HelpTopic;

    constructor(awards: Array<Award>) {
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

    run(args: minimist.ParsedArgs): Array<Award> {
        let data = this.awards;

        if (args.y) {
            data = data.filter((a) => a.year == args.y);
        }

        return data;
    }

}