
export class Volunteer {

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