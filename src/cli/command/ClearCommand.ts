import { Command } from '.';
import { Cli } from '../../cli';

export class ClearCommand implements Command<any> {

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