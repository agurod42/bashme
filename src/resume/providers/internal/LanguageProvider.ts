import { Language } from '../../properties';
import { InfoProvider } from '..';

export interface LanguageProvider extends InfoProvider {
    
    getLanguage(): Array<Language>;

}