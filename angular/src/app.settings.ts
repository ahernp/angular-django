import {Breadcrumb} from "./core/breadcrumbs/breadcrumb";

export const adminBreadcrumb = new Breadcrumb(
    {title: 'Admin', url: '/admin/', linkFlag: true});

export const apiEndpoint: string = '/api';

export const blogArchiveBreadcrumb = new Breadcrumb(
    {title: 'Archive', url: '/sitemap/blog', parentName: 'ahernp.com'});

export const blogRootTitle: string = 'Blog';
export const blogUrl: string = '/blog';
export const blogBreadcrumb = new Breadcrumb(
    {title: 'Blog', url: '/blog', parentName: 'ahernp.com'});

export const dashboardBreadcrumb = new Breadcrumb(
    {title: 'Dashboard', url: '/dashboard', parentName: 'ahernp.com'});

export const feedreaderBreadcrumb = new Breadcrumb(
    {title: 'Feedreader', url: '/feedreader', parentName: 'ahernp.com'});

export const markdownBreadcrumb = new Breadcrumb(
    {title: 'Markdown', url: '/page/markdown'});

export const pageUrl: string = '/page';

export const rootSlug: string = 'ahernp-com';
export const rootTitle: string = 'ahernp.com';
export const rootUrl: string = '/';

export const rootBreadcrumb = new Breadcrumb(
    {title: rootTitle, url: rootUrl});

export const timersBreadcrumb = new Breadcrumb(
    {title: 'Timers', url: '/timers', parentName: 'ahernp.com'});

export const toolsBreadcrumb = new Breadcrumb(
    {title: 'Tools', url: '/tools', parentName: 'ahernp.com'});
