import { Cli } from './cli';
import { Resume } from './resume';
import { InfoProvider } from './resume/providers';
import { AwardCommand, EducationCommand, GenericEchoCommand, LanguageCommand, PublicationCommand, SkillCommand, VolunteerCommand, WorkCommand } from './cli/command';

class Clime {

    public resume: Resume = new Resume();

    constructor() {
    }

    use(infoProvider: InfoProvider): Clime {
        infoProvider.fill(this.resume);
        return this;
    }
    
    show() {
        let cli = new Cli();

        if (this.resume.name) {
            cli.register(new GenericEchoCommand('name', 'Shows name', this.resume.name));
        }

        if (this.resume.bio) {
            cli.register(new GenericEchoCommand('bio', 'Shows bio', this.resume.bio));
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

        cli.show();
    }

}

export default new Clime();