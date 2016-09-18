import {Injectable} from '@angular/core';

import {Breadcrumb} from './breadcrumb';

import appSettings = require('../app.settings');

@Injectable()
export class BreadcrumbService {
    homepageFlag: boolean = true;
    breadcrumbs: Breadcrumb[] = [];

    addBreadcrumb(breadcrumb: Breadcrumb) {
        console.log(`url is ${breadcrumb.url}`);
        this.homepageFlag = breadcrumb.slug == appSettings.homepageSlug;
        if (this.homepageFlag)
            this.breadcrumbs = [];
        else
            this.breadcrumbs.push(breadcrumb);
    }
}
