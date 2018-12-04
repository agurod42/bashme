import { IProperty } from '.';

export class Skill implements IProperty {

    constructor(
        public name: string,
        public level: string,
        public keywords: Array<string>,
    ) {
    }

}