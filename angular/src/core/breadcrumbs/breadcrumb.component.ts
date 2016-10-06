import {Component, Input} from '@angular/core';

import {Breadcrumb} from "./breadcrumb";

@Component({
    selector: 'ad-breadcrumb',
    template: `
        <a *ngIf="breadcrumb.linkFlag" href="{{breadcrumb.url}}">{{breadcrumb.title}}</a>
        <a *ngIf="!breadcrumb.linkFlag" routerLink="{{breadcrumb.url}}">{{breadcrumb.title}}</a>
    `
})
export class BreadcrumbComponent {
    @Input() breadcrumb: Breadcrumb;
}
