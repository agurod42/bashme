import { Cli } from '../../cli';
import { AwardCommand, EducationCommand, AnyStringCommand, LanguageCommand, PublicationCommand, SkillCommand, VolunteerCommand, WorkCommand } from '../../cli/command';
import { Resume } from '../../resume';
import { Award, Education, Language, Publication, Skill, Volunteer, Work } from '../../resume/properties';
import { IntroProvider, AwardProvider, EducationProvider, LanguageProvider, PublicationProvider, SkillProvider, VolunteerProvider, WorkProvider } from '../../resume/providers';

export class Json implements IntroProvider, AwardProvider, EducationProvider, LanguageProvider, PublicationProvider, SkillProvider, VolunteerProvider, WorkProvider {

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

    getAward(): Array<Award> {
        return this.data.award || [];
    }

    getPublication(): Array<Publication> {
        return this.data.publication || [];
    }

    getSkill(): Array<Skill> {
        return this.data.skill || [];
    }

    getLanguage(): Array<Language> {
        return this.data.language || [];
    }
    
    fill(resume: Resume): void {
        resume.name = this.getName();
        resume.bio = this.getBio();
        resume.addEducation(this.getEducation());
        resume.addWork(this.getWork());
        resume.addVolunteer(this.getVolunteer());
        resume.addAward(this.getAward());
        resume.addPublication(this.getPublication());
        resume.addSkill(this.getSkill());
        resume.addLanguage(this.getLanguage());
    }

    registerCommands(cli: Cli): void {
        if (this.data.name) {
            cli.register(new AnyStringCommand('name', 'Shows name', this.data.name));
        }

        if (this.data.bio) {
            cli.register(new AnyStringCommand('bio', 'Shows bio', this.data.bio));
        }

        if (this.data.education && this.data.education.length) {
            cli.register(new EducationCommand(this.data.education));
        }

        if (this.data.work && this.data.work.length) {
            cli.register(new WorkCommand(this.data.work));
        }

        if (this.data.volunteer && this.data.volunteer.length) {
            cli.register(new VolunteerCommand(this.data.volunteer));
        }

        if (this.data.award && this.data.award.length) {
            cli.register(new AwardCommand(this.data.award));
        }

        if (this.data.publication && this.data.publication.length) {
            cli.register(new PublicationCommand(this.data.publication));
        }

        if (this.data.skill && this.data.skill.length) {
            cli.register(new SkillCommand(this.data.skill));
        }

        if (this.data.language && this.data.language.length) {
            cli.register(new LanguageCommand(this.data.language));
        }
    }

}