import { Command } from '.';

export class GenericEchoCommand implements Command<string> {

    private string: string;

    public name: string;
    public description: string;
    public action = this.run;

    constructor(name: string, description: string, string: string) {
        this.name = name;
        this.description = description;
        this.string = string;
    }

    run() {
        return this.string;
    }

}