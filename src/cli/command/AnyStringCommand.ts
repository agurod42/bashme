import { SyncCommand } from '.';

export class AnyStringCommand implements SyncCommand {

    private string: string;

    public name: string;
    public description: string;

    constructor(name: string, description: string, string: string) {
        this.name = name;
        this.description = description;
        this.string = string;
    }

    run(): string {
        return this.string;
    }

}