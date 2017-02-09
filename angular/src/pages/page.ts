import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

export class Page {
    id: number;
    title: string;
    contentType: string;
    content: string;
    slug: string;
    url: string;
    parentId: number;
    parentName: string;
    updated: string;
    published: string;
    children: Breadcrumb[];
}

export class ContentType {
    value: string;
    label: string;
}
