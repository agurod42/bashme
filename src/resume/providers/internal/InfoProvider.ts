import { Command } from '../../../cli/command';
import { Resume } from '../..';

export interface InfoProvider {

    fill(resume: Resume): void;
    getCommands(): Array<Command>;
    
}