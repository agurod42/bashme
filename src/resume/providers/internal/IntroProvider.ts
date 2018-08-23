import { InfoProvider } from '..';

export interface IntroProvider extends InfoProvider {
    
    getName(): string;
    getBio(): string;

}