import { Work } from '../../resume/properties';
import { Command } from '.';

export class WorkCommand implements Command<Work> {

    private work: Array<Work>;

    public name: string = 'work';
    public description: string = 'Shows work';

    constructor(work: Array<Work>) {
        this.work = work;
    }

    run(): Array<Work> {
        return this.work;
    }

}