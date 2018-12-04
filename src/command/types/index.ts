import { ParsedArgs } from 'minimist';

import { HelpTopic } from '../../helpTopic';
import { IProperty } from '../../property';

export abstract class AsyncCommand {

    public abstract name: string;
    public abstract description: string;
    public helpTopic?: HelpTopic;
    public subCommands?: { [key: string]: TCommand };

    public abstract run(args?: ParsedArgs): Promise<TCommandOutput>;

}

export abstract class SyncCommand {

    public abstract name: string;
    public abstract description: string;
    public helpTopic?: HelpTopic;
    public subCommands?: { [key: string]: TCommand };

    public abstract run(args?: ParsedArgs): TCommandOutput;

}

export type TCommand = AsyncCommand | SyncCommand;
export type TCommandOutput = void | IProperty | Array<IProperty>;