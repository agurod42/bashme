import { Language } from '../../properties';
import { InfoProvider } from '..';

export interface LanguagesProvider extends InfoProvider {
    
    getLanguages(): Array<Language>;

}