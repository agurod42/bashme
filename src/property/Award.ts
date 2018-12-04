import { IProperty } from '.';

export class Award implements IProperty {

    constructor(
        public title: string,
        public description: string,
        public awarder: string,
        public year: number
    ) {
    }

}