import { SyncCommand } from './types';

export class AnyStringCommand extends SyncCommand {

    private string: string;

    public name: string;
    public description: string;

    constructor(name: string, description: string, string: string) {
        super();
        this.name = name;
        this.description = description;
        this.string = string;
    }

    run(): string {
        return this.string;
    }

}