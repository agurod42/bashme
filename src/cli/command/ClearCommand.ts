import { SyncCommand } from '.';
import { Cli } from '../../cli';

export class ClearCommand implements SyncCommand {

    private cli: Cli;

    public name: string = 'clear';
    public description: string = 'clear the terminal screen';

    constructor(cli: Cli) {
        this.cli = cli;
    }

    run() {
        this.cli.clear();
    }

}