import { Cli } from './cli';
import { AwardCommand, EducationCommand, AnyStringCommand, LanguageCommand, PublicationCommand, SkillCommand, VolunteerCommand, WorkCommand } from './cli/command';
import { Resume } from './resume';
import { InfoProvider } from './resume/providers';

export default class Bashme {

    public resume: Resume = new Resume();

    constructor() {
    }

    use(infoProvider: InfoProvider): Bashme {
        infoProvider.fill(this.resume);
        return this;
    }
    
    show(domElement: HTMLElement) {
        let cli = new Cli();

        if (this.resume.name) {
            cli.register(new AnyStringCommand('name', 'Shows name', this.resume.name));
        }

        if (this.resume.bio) {
            cli.register(new AnyStringCommand('bio', 'Shows bio', this.resume.bio));
        }

        if (this.resume.education && this.resume.education.length) {
            cli.register(new EducationCommand(this.resume.education));
        }

        if (this.resume.work && this.resume.work.length) {
            cli.register(new WorkCommand(this.resume.work));
        }

        if (this.resume.volunteer && this.resume.volunteer.length) {
            cli.register(new VolunteerCommand(this.resume.volunteer));
        }

        if (this.resume.award && this.resume.award.length) {
            cli.register(new AwardCommand(this.resume.award));
        }

        if (this.resume.publication && this.resume.publication.length) {
            cli.register(new PublicationCommand(this.resume.publication));
        }

        if (this.resume.skill && this.resume.skill.length) {
            cli.register(new SkillCommand(this.resume.skill));
        }

        if (this.resume.language && this.resume.language.length) {
            cli.register(new LanguageCommand(this.resume.language));
        }

        cli.show(domElement);
    }

}

export * from './resume/providers';
