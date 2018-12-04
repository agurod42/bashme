import { TCommand } from '../command/types';

export class HelpTopic {

    private command: TCommand;
    private helpTopicArgs: HelpTopicArguments;

    constructor(command: TCommand, helpTopicArgs: HelpTopicArguments) {
        this.command = command;
        this.helpTopicArgs = helpTopicArgs;
    }

    public toString(): string {
        let output = '';

        if (this.helpTopicArgs.synopsis) {
            output += `SYNOPSIS\r\n\t${this.helpTopicArgs.synopsis}\r\n\r\n`;
        }

        if (this.command.description) {
            output += `DESCRIPTION\r\n\t${this.command.description}\r\n\r\n`;
            if (this.helpTopicArgs.options) {
                output += '\tThe following options are available:\r\n\r\n';
                for (var key in this.helpTopicArgs.options) {
                    output += `\t${key}\t${this.helpTopicArgs.options[key]}\r\n`;
                }
            }
            output += '\r\n';
        }

        if (this.helpTopicArgs.examples) {
            output += `EXAMPLES\r\n`;
            this.helpTopicArgs.examples.forEach(example => {
                output += `\t- ${example.description}\r\n\t\t${example.cmd}\r\n\r\n`;
            });
        }

        return output.trim();
    }

}

export interface HelpTopicArguments {
    synopsis?: string,
    options?: { [key: string]: string; },
    examples?: Array<HelpTopicArgumentsExample>,
}

interface HelpTopicArgumentsExample {
    description: string,
    cmd: string
}