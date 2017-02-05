import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

export class Page {
    id: number;
    title: string;
    slug: string;
    url: string;
    parentId: number;
    parentName: string;
    updated: string;
    published: string;
    contentType: string;
    content: string;
    children: Breadcrumb[];
}
