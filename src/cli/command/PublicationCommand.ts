import { Publication } from '../../resume/properties';
import { Command } from '.';

export class PublicationCommand implements Command<Publication> {

    private publication: Array<Publication>;

    public name: string = 'publications';
    public description: string = 'Shows publications';
    public action = this.run;

    constructor(publication: Array<Publication>) {
        this.publication = publication;
    }

    run(): Array<Publication> {
        return this.publication;
    }

}