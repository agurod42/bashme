import * as minimist from 'minimist';

import { HelpTopic } from '../helpTopic';

export * from './AnyStringCommand';
export * from './DebugCommand';

export * from './AwardsCommand';
export * from './EducationCommand';
export * from './LanguagesCommand';
export * from './PublicationsCommand';
export * from './SkillsCommand';
export * from './VolunteerCommand';
export * from './WorkCommand';

export interface Command<T> {

    name: string;
    description: string;
    helpTopic?: HelpTopic;

    run(args?: minimist.ParsedArgs): CommandOutput;

}

export type CommandOutput = number | string | object | Array<any>;