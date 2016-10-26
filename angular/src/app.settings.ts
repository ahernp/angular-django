import {Breadcrumb} from "./core/breadcrumbs/breadcrumb";

export const apiEndpoint: string = '/api';
export const rootTitle: string = 'ahernp.com';
export const rootUrl: string = '/';
export const rootSlug: string = 'ahernp-com';
export const rootBreadcrumb = new Breadcrumb({title: rootTitle, url: rootUrl});
export const markdownBreadcrumb = new Breadcrumb({title: 'Markdown', url: '/page/markdown'});
export const adminBreadcrumb = new Breadcrumb({title: 'Admin', url: '/admin/', linkFlag: true});
