interface FooterOptions {
    updated?: string;
    sourceFlag?: boolean;
    markdownFlag?: boolean;
    adminUrl?: string;
}

export class Footer {
    updated: string;
    sourceFlag: boolean;
    markdownFlag: boolean;
    adminUrl: string;

    constructor(args: FooterOptions) {
        this.updated = args.updated;
        this.sourceFlag = args.sourceFlag;
        this.markdownFlag = args.markdownFlag;
        this.adminUrl = args.adminUrl;
    }
}
