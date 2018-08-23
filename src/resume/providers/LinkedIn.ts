import { Resume } from '../../resume';
import { IntroProvider } from '../../resume/providers';

export class LinkedIn implements IntroProvider {

    constructor(url: string) {
        console.log(url);
    }

    getName(): string {
        return '';
    }

    getBio(): string {
        return '';
    }   
    
    fill(resume: Resume): void {
        
    }

}