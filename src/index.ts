import { EventEmitter } from 'events';
import { Cli } from './cli';
import { ClearCommand, DebugCommand, HelpCommand } from './cli/command';
import { Resume } from './resume';
import { InfoProvider } from './resume/providers';

export interface BashmeOptions {
    debugMode?: boolean;
    prompt?: string;
    welcomeMessage?: string;
}

export default class Bashme extends EventEmitter {

    private options: BashmeOptions = {
        debugMode: false,
        prompt: 'bashme$ ',
        welcomeMessage: ''
    };

    public cli: Cli;
    public resume: Resume = new Resume();

    constructor(options?: BashmeOptions) {
        super();

        if (options) {
            Object.assign(this.options, options);
        }

        this.cli = new Cli({
            prompt: this.options.prompt,
            welcomeMessage: this.options.welcomeMessage
        });

        this.cli.on('input', (...args) => this.emit('input', ...args));

        this.cli.register(new ClearCommand(this.cli));
        this.cli.register(new HelpCommand(this.cli));

        if (this.options.debugMode) {
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
