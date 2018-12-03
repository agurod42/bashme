import { ParsedArgs } from 'minimist';

import { HelpTopic } from '../helpTopic';

export * from './AnyPromiseCommand';
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

export interface SyncCommand {

    name: string;
    description: string;
    helpTopic?: HelpTopic;
    subCommands?: { [key: string]: Command };

    run(args?: ParsedArgs): CommandOutput;

}

export interface AsyncCommand {

    name: string;
    description: string;
    helpTopic?: HelpTopic;
    subCommands?: { [key: string]: Command };

    run(args?: ParsedArgs): Promise<CommandOutput>;

}

export type Command = AsyncCommand | SyncCommand; 
export type CommandOutput = void | number | string | object | Array<any>;

export function isCommandAsync(command: Command): command is AsyncCommand {
    return (<AsyncCommand>command).run instanceof Promise;
}