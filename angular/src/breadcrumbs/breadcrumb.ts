export class Breadcrumb {
    label: string;
    slug: string;
    url: string;

    constructor(label:string, slug: string, url:string) {
        this.label = label;
        this.slug = slug;
        this.url = url;
    }
}
