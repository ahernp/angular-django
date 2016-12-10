import {Component, Input} from '@angular/core';

import {Breadcrumb} from "./breadcrumb";

@Component({
    selector: 'ad-breadcrumb',
    template: `
        <a *ngIf="breadcrumb.externalLinkFlag" href="{{breadcrumb.url}}">{{breadcrumb.title}}</a>
        <a *ngIf="!breadcrumb.externalLinkFlag" routerLink="{{breadcrumb.url}}">{{breadcrumb.title}}</a>
    `
})
export class BreadcrumbComponent {
    @Input() breadcrumb: Breadcrumb;
}
