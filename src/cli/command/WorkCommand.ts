import { Work } from '../../resume/properties';
import { Command } from '.';

export class WorkCommand implements Command<Work> {

    private work: Array<Work>;

    public name: string = 'work';
    public description: string = 'Shows work';
    public action = this.run;

    constructor(work: Array<Work>) {
        this.work = work;
    }

    run() {
        console.log(this.work);
    }

}