import { AnyStringCommand, AwardsCommand, EducationCommand, LanguagesCommand, PublicationsCommand, SkillsCommand, VolunteerCommand, WorkCommand } from '../command';
import { TCommand } from '../command/types';
import { IProvider } from './types';

export class Json implements IProvider {

    private data: any;

    constructor(object: object) {
        this.data = object;
    }

    getCommands(): Array<TCommand> {
        let commands: Array<TCommand> = [];

        if (this.data.name) {
            commands.push(new AnyStringCommand('name', 'shows name', this.data.name));
        }

        if (this.data.bio) {
            commands.push(new AnyStringCommand('bio', 'shows bio', this.data.bio));
        }

        if (this.data.education && this.data.education.length) {
            commands.push(new EducationCommand(this.data.education));
        }

        if (this.data.work && this.data.work.length) {
            commands.push(new WorkCommand(this.data.work));
        }

        if (this.data.volunteer && this.data.volunteer.length) {
            commands.push(new VolunteerCommand(this.data.volunteer));
        }

        if (this.data.awards && this.data.awards.length) {
            commands.push(new AwardsCommand(this.data.awards));
        }

        if (this.data.publications && this.data.publications.length) {
            commands.push(new PublicationsCommand(this.data.publications));
        }

        if (this.data.skills && this.data.skills.length) {
            commands.push(new SkillsCommand(this.data.skills));
        }

        if (this.data.languages && this.data.languages.length) {
            commands.push(new LanguagesCommand(this.data.languages));
        }

        return commands;
    }

}