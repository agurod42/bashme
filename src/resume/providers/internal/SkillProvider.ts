import { Skill } from '../../properties';
import { InfoProvider } from '..';

export interface SkillProvider extends InfoProvider {
    
    getSkill(): Array<Skill>;

}