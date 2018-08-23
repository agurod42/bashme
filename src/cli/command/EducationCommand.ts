import { Education } from '../../resume/properties';
import { Command } from '.';

export class EducationCommand implements Command<Education> {

    private education: Array<Education>;

    public name: string = 'education';
    public description: string = 'Shows education';
    public action = this.run;

    constructor(education: Array<Education>) {
        this.education = education;
    }

    run() {
        console.log(this.education);
    }

}