import {Injectable} from '@angular/core';

import {Breadcrumb} from './breadcrumb';

import {rootTitle} from "../../app.settings";

@Injectable()
export class BreadcrumbService {
    breadcrumbs: Breadcrumb[] = [<Breadcrumb>{title: rootTitle, url: '/'}];

    addBreadcrumb(newBreadcrumb: Breadcrumb): Breadcrumb[] {
        this.breadcrumbs.push(newBreadcrumb);
        for (var i = 0; i < this.breadcrumbs.length; i++) {
            if (this.breadcrumbs[i].title == newBreadcrumb.title) {
                this.breadcrumbs = this.breadcrumbs.slice(0, i+1);
                break
            }
        }
        return this.breadcrumbs;
    }
}
