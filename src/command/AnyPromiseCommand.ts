import { AsyncCommand } from './types';

export class AnyPromiseCommand extends AsyncCommand {

    public name: string;
    public description: string;

    public promise: Promise<any>;

    constructor(name: string, description: string, promise: Promise<any>) {
        super();
        this.name = name;
        this.description = description;
        this.promise = promise;
    }

    run(): Promise<any> {
        return this.promise;
    }

}