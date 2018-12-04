import { IProperty } from '.';

export class Education implements IProperty {

    constructor(
        public university: string,
        public degree: string,
        public fieldOfStudy: string,
        public grade: number,
        public startYear: number,
        public endYear: number,
        public notes: string
    ) {
    }

}