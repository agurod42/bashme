import { ParsedArgs } from 'minimist';

import { HelpTopic } from '../helpTopic';
import { Volunteer } from '../property';
import { SyncCommand } from './types';

export class VolunteerCommand extends SyncCommand {

    private volunteer: Array<Volunteer>;

    public name: string = 'volunteer';
    public description: string = 'shows volunteer experience';
    public helpTopic: HelpTopic;

    constructor(volunteer: Array<Volunteer>) {
        super();
        this.volunteer = volunteer;
        this.helpTopic = new HelpTopic(this, {
            synopsis: 'volunteer [--currentYear XOR -y]',
            options: {
                '--currentYear': 'List all volunteer experience in the current year',
                '-y': 'List all volunteer experience in which the year -y is between startYear and endYear',
            },
            examples: [
                {
                    cmd: 'volunteer --currentYear',
                    description: 'The following command shows all volunteer experience that happened in the current year'
                },
                {
                    cmd: 'volunteer -y 2018',
                    description: 'The following command shows all volunteer experience that happened in the 2018 year'
                },
                {
                    cmd: 'volunteer --currentYear -y 2017',
                    description: 'The following command shows all volunteer experience that happened in the current year (Because --currentYear has more precedence than -y)'
                }
            ]
        });
    }

    run(args: ParsedArgs): Array<Volunteer> {
        let data = this.volunteer;

        if (args.currentYear) {
            let currentYear = new Date().getUTCFullYear() - 1;
            data = data.filter((v) => v.startYear <= currentYear && v.endYear >= currentYear);
        }
        else if (args.y) {
            data = data.filter((v) => v.startYear <= args.y && v.endYear >= args.y);
        }

        return data;
    }

}