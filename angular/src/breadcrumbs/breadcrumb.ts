export class Breadcrumb {
    title: string;
    url: string;
    updated: string;
    parentName: string;

    constructor(title:string, url:string, updated: string, parentName: string) {
        this.title = title;
        this.url = url;
        this.updated = updated;
        this.parentName = parentName;
    }
}
