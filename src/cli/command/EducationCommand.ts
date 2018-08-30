import { Education } from '../../resume/properties';
import { arrayToAsciiTable } from '../util';
import { Command } from '.';

export class EducationCommand implements Command<Education> {

    private education: Array<Education>;

    public name: string = 'education';
    public description: string = 'Shows education';

    constructor(education: Array<Education>) {
        this.education = education;
    }

    run(): string {
        return arrayToAsciiTable(this.education);
    }

}