import {Breadcrumb} from "../breadcrumbs/breadcrumb";

interface FooterOptions {
    updated?: string;
    sourceFlag?: boolean;
    markdownFlag?: boolean;
    links?: Breadcrumb[];
    routerLinks?: Breadcrumb[];
}

export class Footer {
    updated: string;
    sourceFlag: boolean;
    markdownFlag: boolean;
    links: Breadcrumb[];
    routerLinks: Breadcrumb[];

    constructor(args: FooterOptions) {
        this.updated = args.updated;
        this.sourceFlag = args.sourceFlag;
        this.markdownFlag = args.markdownFlag;
        this.links = args.links;
        this.routerLinks = args.routerLinks;
    }
}
