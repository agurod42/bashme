import { AsyncCommand } from '.';

export class AnyPromiseCommand implements AsyncCommand {

    private promise: Promise<any>;

    public name: string;
    public description: string;

    constructor(name: string, description: string, promise: Promise<any>) {
        this.name = name;
        this.description = description;
        this.promise = promise;
    }

    run(): Promise<any> {
        return this.promise;
    }

}