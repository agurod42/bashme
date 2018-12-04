import { IProperty } from '.';

export class Language implements IProperty {

    constructor(
        public name: string,
        public level: string
    ) {
    }

}