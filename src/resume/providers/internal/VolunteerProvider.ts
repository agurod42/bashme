import { Volunteer } from '../../properties';
import { InfoProvider } from '..';

export interface VolunteerProvider extends InfoProvider {
    
    getVolunteer(): Array<Volunteer>;

}