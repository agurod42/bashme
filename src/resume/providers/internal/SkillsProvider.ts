import { Skill } from '../../properties';
import { InfoProvider } from '..';

export interface SkillsProvider extends InfoProvider {
    
    getSkills(): Array<Skill>;

}