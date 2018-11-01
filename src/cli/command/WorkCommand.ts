import { ParsedArgs } from 'minimist';

import { Work } from '../../resume/properties';
import { HelpTopic } from '../helpTopic';
import { Command } from '.';

export class WorkCommand implements Command<Work> {

    private work: Array<Work>;

    public name: string = 'work';
    public description: string = 'shows work experience';
    public helpTopic: HelpTopic;

    constructor(work: Array<Work>) {
        this.work = work;
        this.helpTopic = new HelpTopic(this, {
            synopsis: 'work [--current XOR -y]',
            options: {
                '--current': 'List all work experience in the current year',
                '-y': 'List all work experience in which the year -y is between startYear and endYear',
            },
            examples: [
                {
                    cmd: 'work --current',
                    description: 'The following command shows the current work experience'
                },
                {
                    cmd: 'work -y 2018',
                    description: 'The following command shows all the work experience that happened in the 2018 year'
                },
                {
                    cmd: 'work --current -y 2017',
                    description: 'The following command shows the current work experience (Because --current has more precedence than -y)'
                }
            ]
        });
    }

    run(args: ParsedArgs): Array<Work> {
        let data = this.work;

        if (args.current) {
            data = data.filter((w) => w.endYear === null);
        }
        else if (args.y) {
            data = data.filter((w) => w.startYear <= args.y && w.endYear >= args.y);
        }

        return data;
    }

}