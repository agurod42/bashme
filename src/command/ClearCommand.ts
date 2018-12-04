import { Cli } from '../cli';
import { SyncCommand } from './types';

export class ClearCommand extends SyncCommand {

    private cli: Cli;

    public name: string = 'clear';
    public description: string = 'clear the terminal screen';

    constructor(cli: Cli) {
        super();
        this.cli = cli;
    }

    run(): void {
        this.cli.clear();
    }

}