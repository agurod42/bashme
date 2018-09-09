import minimist from 'minimist';

import { Education } from '../../resume/properties';
import { HelpTopic } from '../helpTopic';
import { Command } from '.';

export class EducationCommand implements Command<Education> {

    private education: Array<Education>;

    public name: string = 'education';
    public description: string = 'Shows education';
    public helpTopic: HelpTopic;

    constructor(education: Array<Education>) {
        this.education = education;
        this.helpTopic = new HelpTopic(this, {
            synopsis: 'education [-y]',
            options: {
                '-y': 'List all entries which contains the -y year between startYear and endYear'
            },
            examples: [
                {
                    cmd: 'education -y 2018',
                    description: 'The following command shows all education entries that happened in the 2018 year'
                }
            ]
        });
    }

    run(args: minimist.ParsedArgs): Array<Education> {
        let data = this.education;

        if (args.y) {
            data = data.filter((e) => e.startYear <= args.y && e.endYear >= args.y);
        }

        return data;
    }

}