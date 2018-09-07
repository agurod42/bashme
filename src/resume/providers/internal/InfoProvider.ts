import { Cli } from '../../../cli';
import { Resume } from '../..';

export interface InfoProvider {

    fill(resume: Resume): void;
    registerCommands(cli: Cli): void;
    
}