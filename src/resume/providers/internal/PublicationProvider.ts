import { Publication } from '../../properties';
import { InfoProvider } from '..';

export interface PublicationProvider extends InfoProvider {
    
    getPublication(): Array<Publication>;

}