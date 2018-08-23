import { Resume } from '../..';

export interface InfoProvider {

    fill(resume: Resume): void;
    
}