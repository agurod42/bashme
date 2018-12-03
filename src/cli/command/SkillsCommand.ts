import { ParsedArgs } from 'minimist';

import { Skill } from '../../resume/properties';
import { HelpTopic } from '../helpTopic';
import { SyncCommand } from '.';

export class SkillsCommand implements SyncCommand {

    private skills: Array<Skill>;

    public name: string = 'skills';
    public description: string = 'shows skills';
    public helpTopic: HelpTopic;

    constructor(skills: Array<Skill>) {
        this.skills = skills;
        this.helpTopic = new HelpTopic(this, {
            synopsis: 'skills [-l]',
            options: {
                '-l': 'List all skills in which the level is -l'
            },
            examples: [
                {
                    cmd: 'skills -l advanced',
                    description: 'The following command shows all skills in which the level is advanced'
                }
            ]
        });
    }

    run(args: ParsedArgs): Array<Skill> {
        let data = this.skills;

        if (args.l) {
            data = data.filter((s) => s.level === args.l);
        }

        return data;
    }

}