import { Cli } from './cli';
import { AwardCommand, EducationCommand, AnyStringCommand, LanguageCommand, PublicationCommand, SkillCommand, VolunteerCommand, WorkCommand } from './cli/command';
import { Resume } from './resume';
import { InfoProvider } from './resume/providers';

class Clime {

    public resume: Resume = new Resume();

    constructor() {
    }

    use(infoProvider: InfoProvider): Clime {
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

        if (this.resume.education) {
            cli.register(new EducationCommand(this.resume.education));
        }

        if (this.resume.work) {
            cli.register(new WorkCommand(this.resume.work));
        }

        if (this.resume.volunteer) {
            cli.register(new VolunteerCommand(this.resume.volunteer));
        }

        if (this.resume.award) {
            cli.register(new AwardCommand(this.resume.award));
        }

        if (this.resume.publication) {
            cli.register(new PublicationCommand(this.resume.publication));
        }

        if (this.resume.skill) {
            cli.register(new SkillCommand(this.resume.skill));
        }

        if (this.resume.language) {
            cli.register(new LanguageCommand(this.resume.language));
        }

        cli.show(domElement);
    }

}

export default new Clime();