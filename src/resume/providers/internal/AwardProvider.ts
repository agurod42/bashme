import { Award } from '../../properties';
import { InfoProvider } from '..';

export interface AwardProvider extends InfoProvider {
    
    getAward(): Array<Award>;

}