import { Work } from '../../resume/properties';
import { arrayToAsciiTable } from '../util';
import { Command } from '.';

export class WorkCommand implements Command<Work> {

    private work: Array<Work>;

    public name: string = 'work';
    public description: string = 'Shows work';

    constructor(work: Array<Work>) {
        this.work = work;
    }

    run(): string {
        return arrayToAsciiTable(this.work);
    }

}