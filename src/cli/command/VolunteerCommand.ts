import { Volunteer } from '../../resume/properties';
import { Command } from '.';

export class VolunteerCommand implements Command<Volunteer> {

    private volunteer: Array<Volunteer>;

    public name: string = 'volunteer';
    public description: string = 'Shows volunteer';
    public action = this.run;

    constructor(volunteer: Array<Volunteer>) {
        this.volunteer = volunteer;
    }

    run() {
        return this.volunteer;
    }

}