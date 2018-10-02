import { EventEmitter } from 'events';
import { Cli } from './cli';
import { ClearCommand, DebugCommand, HelpCommand } from './cli/command';
import { Resume } from './resume';
import { InfoProvider } from './resume/providers';

export default class Bashme extends EventEmitter {

    public cli: Cli;
    public resume: Resume = new Resume();

    constructor(debugMode: boolean = false) {
        super();

        this.cli = new Cli();
        this.cli.on('input', (...args) => this.emit('input', ...args));

        this.cli.register(new ClearCommand(this.cli));
        this.cli.register(new HelpCommand(this.cli));

        if (debugMode) {
            this.cli.register(new DebugCommand());
        }
    }

    use(infoProvider: InfoProvider): Bashme {
        infoProvider.fill(this.resume);
        infoProvider.getCommands().forEach(command => this.cli.register(command));
        return this;
    }
    
    show(domElement: HTMLElement) {
        this.cli.show(domElement);
    }

}

export * from './resume/providers';
