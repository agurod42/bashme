
interface HelpTopicArgumentsExample {
    description: string,
    cmd: string
}

export interface HelpTopicArguments {
    synopsis?: string,
    options?: { [key: string]: string; },
    examples?: Array<HelpTopicArgumentsExample>,
}