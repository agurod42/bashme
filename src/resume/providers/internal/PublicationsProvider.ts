import { Publication } from '../../properties';
import { InfoProvider } from '..';

export interface PublicationsProvider extends InfoProvider {
    
    getPublications(): Array<Publication>;

}