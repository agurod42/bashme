import { Award } from '../../resume/properties';
import { Command } from '.';

export class AwardCommand implements Command<Award> {

    private award: Array<Award>;

    public name: string = 'awards';
    public description: string = 'Shows awards';
    public action = this.run;

    constructor(award: Array<Award>) {
        this.award = award;
    }

    run() {
        console.log(this.award);
    }

}