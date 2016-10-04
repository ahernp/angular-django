import {Breadcrumb} from "../breadcrumbs/breadcrumb";

interface FooterOptions {
    updated?: string;
    sourceFlag?: boolean;
    linkFlag?: boolean;
    breadcrumbs?: Breadcrumb[];
}

export class Footer {
    updated: string;
    sourceFlag: boolean;
    linkFlag: boolean;
    breadcrumbs: Breadcrumb[];

    constructor(args: FooterOptions) {
        this.updated = args.updated;
        this.sourceFlag = args.sourceFlag;
        this.linkFlag = args.linkFlag;
        this.breadcrumbs = args.breadcrumbs;
    }
}
