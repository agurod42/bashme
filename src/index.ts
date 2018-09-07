import { Cli } from './cli';
import { DebugCommand } from './cli/command';
import { Resume } from './resume';
import { InfoProvider } from './resume/providers';

export default class Bashme {

    public cli: Cli;
    public resume: Resume = new Resume();

    constructor(debugMode: boolean = false) {
        this.cli = new Cli();

        if (debugMode) {
            this.cli.register(new DebugCommand());
        }
    }

    use(infoProvider: InfoProvider): Bashme {
        infoProvider.fill(this.resume);
        infoProvider.registerCommands(this.cli);
        return this;
    }
    
    show(domElement: HTMLElement) {
        this.cli.show(domElement);
    }

}

export * from './resume/providers';
