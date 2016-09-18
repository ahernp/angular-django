import {Injectable} from '@angular/core';

import {Breadcrumb} from './breadcrumb';

import appSettings = require('../app.settings');

@Injectable()
export class BreadcrumbService {
    homepageFlag: boolean = true;
    breadcrumbs: Breadcrumb[] = [];
    lastBreadcrumb: any = undefined;

    addBreadcrumb(newBreadcrumb: Breadcrumb) {
        this.homepageFlag = newBreadcrumb.slug == appSettings.homepageSlug;
        if (this.homepageFlag) {
            this.breadcrumbs = [];
            this.lastBreadcrumb = undefined;
        }
        else
            if (this.lastBreadcrumb == undefined)
                this.lastBreadcrumb = newBreadcrumb;
            else {
                this.breadcrumbs.push(this.lastBreadcrumb);
                this.lastBreadcrumb = newBreadcrumb;
            }
    }
}
