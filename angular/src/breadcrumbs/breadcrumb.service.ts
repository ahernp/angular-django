import {Injectable} from '@angular/core';

import {Breadcrumb} from './breadcrumb';

import appSettings = require('../app.settings');

@Injectable()
export class BreadcrumbService {
    breadcrumbs: Breadcrumb[] = [new Breadcrumb('ahernp.com', '/')];

    addBreadcrumb(newBreadcrumb: Breadcrumb): Breadcrumb[] {
        this.breadcrumbs.push(newBreadcrumb);
        for (var i = 0; i < this.breadcrumbs.length; i++) {
            if (this.breadcrumbs[i].label == newBreadcrumb.label) {
                this.breadcrumbs = this.breadcrumbs.slice(0, i+1);
                break
            }
        }
        return this.breadcrumbs;
    }
}
