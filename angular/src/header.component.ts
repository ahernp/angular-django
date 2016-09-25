import {Component, Input} from '@angular/core';

import {Breadcrumb} from './breadcrumbs/breadcrumb';

@Component({
    selector: 'ad-header',
    template: `
        <p>
            <span *ngFor="let breadcrumb of breadcrumbs; let first = first; let last = last">
                <span *ngIf="!first">› </span>
                <span *ngIf="!last"><a routerLink="{{breadcrumb.url}}">{{breadcrumb.title}}</a></span>
                <span *ngIf="last">{{breadcrumb.title}}</span>
            </span>
        </p>
`
})
export class HeaderComponent {
    @Input() breadcrumbs: Breadcrumb[];
}
