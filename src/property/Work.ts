import { IProperty } from '.';

export class Work implements IProperty {

    constructor(
        public company: string,
        public position: string,
        public startMonth: number,
        public startYear: number,
        public endMonth: number,
        public endYear: number,
        public description: string
    ) {
    }

}