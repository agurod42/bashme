import { AnyStringCommand, AwardsCommand, EducationCommand, LanguagesCommand, PublicationsCommand, SkillsCommand, VolunteerCommand, WorkCommand } from '../command';
import { TCommand } from '../command/types';
import { Award, Education, Language, Publication, Skill, Volunteer, Work } from '../property';
import { IProvider } from './types';

export class Json implements IProvider {

    private data: any;

    constructor(object: object) {
        this.data = object;
    }

    getName(): string {
        return this.data.name;
    }

    getBio(): string {
        return this.data.bio;
    }

    getEducation(): Array<Education> {
        return this.data.education || [];
    }

    getWork(): Array<Work> {
        return this.data.work || [];
    }

    getVolunteer(): Array<Volunteer> {
        return this.data.volunteer || [];
    }

    getAwards(): Array<Award> {
        return this.data.award || [];
    }

    getPublications(): Array<Publication> {
        return this.data.publication || [];
    }

    getSkills(): Array<Skill> {
        return this.data.skill || [];
    }

    getLanguages(): Array<Language> {
        return this.data.language || [];
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