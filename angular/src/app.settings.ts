import {Breadcrumb} from "./breadcrumbs/breadcrumb";

export const apiEndpoint: string = '/api';
export const rootTitle: string = 'ahernp.com Beta';
export const rootUrl: string = '/';
export const rootBreadcrumb = new Breadcrumb({title: rootTitle, url: rootUrl});
export const markdownBreadcrumb = new Breadcrumb({title: 'Markdown', url: '/page/markdown'});
export const adminBreadcrumb = new Breadcrumb({title: 'Admin', url: '/admin/'});

var leadingZero = (number) => number < 10 ? `0${number}` : number;

export function toDateTimeString(date: Date):string {
    return '' +
        date.getFullYear() + '-' +
        leadingZero(date.getUTCMonth()) + '-' +
        leadingZero(date.getUTCDate()) + ' ' +
        leadingZero(date.getUTCHours()) + ':' +
        leadingZero(date.getUTCMinutes()) + ':' +
        leadingZero(date.getUTCSeconds())
}
