import { Education } from '../../properties';
import { InfoProvider } from '..';

export interface EducationProvider extends InfoProvider {
    
    getEducation(): Array<Education>;

}