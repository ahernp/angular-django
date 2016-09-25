import {Breadcrumb} from "./breadcrumbs/breadcrumb";

export const apiEndpoint: string = '/api';
export const rootTitle: string = 'ahernp.com';
export const markdownBreadcrumb = new Breadcrumb({title: 'Markdown', url: '/page/markdown'});

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
