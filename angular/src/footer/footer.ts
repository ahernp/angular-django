import {Breadcrumb} from "../breadcrumbs/breadcrumb";

interface FooterOptions {
    updated?: string;
    breadcrumbs: Breadcrumb[];
    adminUrl?: string;
}

export class Footer {
    updated: string;
    breadcrumbs: Breadcrumb[];
    adminUrl: string;

    constructor(args: FooterOptions) {
        this.updated = args.updated;
        this.breadcrumbs = args.breadcrumbs;
        this.adminUrl = args.adminUrl;
    }
}
