import { Skill } from '../../resume/properties';
import { Command } from '.';

export class SkillCommand implements Command<Skill> {

    private skill: Array<Skill>;

    public name: string = 'skills';
    public description: string = 'Shows skills';

    constructor(skill: Array<Skill>) {
        this.skill = skill;
    }

    run(): Array<Skill> {
        return this.skill;
    }

}