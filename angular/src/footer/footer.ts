import {Breadcrumb} from "../breadcrumbs/breadcrumb";

interface FooterOptions {
    updated?: string;
    sourceFlag?: boolean;
    markdownFlag?: boolean;
    adminUrl?: string;
    breadcrumbs?: Breadcrumb[];
}

export class Footer {
    updated: string;
    sourceFlag: boolean;
    markdownFlag: boolean;
    adminUrl: string;
    breadcrumbs: Breadcrumb[];

    constructor(args: FooterOptions) {
        this.updated = args.updated;
        this.sourceFlag = args.sourceFlag;
        this.markdownFlag = args.markdownFlag;
        this.adminUrl = args.adminUrl;
        this.breadcrumbs = args.breadcrumbs;
    }
}
