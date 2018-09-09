import { Award } from '../../resume/properties';
import { Command } from '.';

export class AwardCommand implements Command<Award> {

    private award: Array<Award>;

    public name: string = 'awards';
    public description: string = 'Shows awards';

    constructor(award: Array<Award>) {
        this.award = award;
    }

    run(): Array<Award> {
        return this.award;
    }

}