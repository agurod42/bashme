import { IProperty } from '.';

export class Volunteer implements IProperty {

    constructor(
        public organization: string,
        public position: string,
        public startMonth: number,
        public startYear: number,
        public endMonth: number,
        public endYear: number,
        public description: string
    ) {
    }

}