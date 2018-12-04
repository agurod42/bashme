import { IProperty } from '.';

export class Publication implements IProperty {

    constructor(
        public name: string,
        public description: string,
        public publisher: string,
        public releaseYear: number,
        public url: string
    ) {
    }

}