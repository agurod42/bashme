
export class HelpTopic {

    private data: string;

    constructor(data: string) {
        this.data = data;
    }

    public toString(): string {
        return this.data;
    }

}