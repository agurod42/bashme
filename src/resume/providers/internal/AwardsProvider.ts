import { Award } from '../../properties';
import { InfoProvider } from '..';

export interface AwardsProvider extends InfoProvider {
    
    getAwards(): Array<Award>;

}