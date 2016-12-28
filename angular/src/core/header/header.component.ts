import {Component, Input} from '@angular/core';

import {Breadcrumb} from '../breadcrumbs/breadcrumb';

@Component({
    selector: 'ad-header',
    template: `
        <p class="breadcrumbs">
            <span *ngFor="let breadcrumb of breadcrumbs; let first = first; let last = last">
                <span *ngIf="!first">&rsaquo; </span>
                <span *ngIf="!last"><ad-breadcrumb [breadcrumb]="breadcrumb"></ad-breadcrumb></span>
                <span *ngIf="last">{{breadcrumb.title}}</span>
            </span>
        </p>
        <ad-page-search></ad-page-search>
    `
})
export class HeaderComponent {
    @Input() breadcrumbs: Breadcrumb[];
}
