import {Breadcrumb} from "./core/breadcrumbs/breadcrumb";

export const adminBreadcrumb = <Breadcrumb>
    {title: 'Admin', url: '/admin/', externalLinkFlag: true};

export const apiEndpoint: string = '/api';

export const rootSlug: string = 'ahernp-com';
export const rootTitle: string = 'ahernp.com';

const rootUrl: string = '/';
export const rootBreadcrumb = <Breadcrumb>
    {title: rootTitle, url: rootUrl};

/* Dashboard breadcrumb must be defined here to avoid circular imports
   as PageService imports it and PageService is imported by DashboardComponent */
export const dashboardTitle: string = 'Dashboard';
export const dashboardUrl: string = '/dashboard';
export const dashboardBreadcrumb = <Breadcrumb>
    {title: dashboardTitle, url: dashboardUrl, parentName: rootTitle};
