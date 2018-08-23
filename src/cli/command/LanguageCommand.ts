import { Language } from '../../resume/properties';
import { Command } from '.';

export class LanguageCommand implements Command<Language> {

    private language: Array<Language>;

    public name: string = 'languages';
    public description: string = 'Shows languages';
    public action = this.run;

    constructor(language: Array<Language>) {
        this.language = language;
    }

    run() {
        console.log(this.language);
    }

}