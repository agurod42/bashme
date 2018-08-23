import { Work } from '../../properties';
import { InfoProvider } from '..';

export interface WorkProvider extends InfoProvider {
    
    getWork(): Array<Work>;

}