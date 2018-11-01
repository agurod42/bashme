import { ParsedArgs } from 'minimist';

import { HelpTopic } from '../helpTopic';

export * from './AnyStringCommand';
export * from './ClearCommand';
export * from './DebugCommand';
export * from './HelpCommand';

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
    subCommands?: { [key: string]: SubCommand<T> };

    run(args?: ParsedArgs): CommandOutput;

}

export interface SubCommand<T> extends Command<T> {

    parent: Command<T>;

}

export type CommandOutput = void | number | string | object | Array<any>;