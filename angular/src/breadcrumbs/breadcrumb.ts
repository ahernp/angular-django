interface BreadcrumbOptions {
    title: string;
    url: string;
    updated?: string;
    parentName?: string;
}

export class Breadcrumb {
    title: string;
    url: string;
    updated: string;
    parentName: string;

    constructor(args: BreadcrumbOptions) {
        this.title = args.title;
        this.url = args.url;
        this.updated = args.updated;
        this.parentName = args.parentName;
    }
}
