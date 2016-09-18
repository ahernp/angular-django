import {Component, Input} from '@angular/core';

import {Page} from './pages/page';

import {Breadcrumb} from './breadcrumbs/breadcrumb';
import {BreadcrumbService} from './breadcrumbs/breadcrumb.service';

@Component({
    selector: 'ad-header',
    template: `
        <p *ngIf="breadcrumbService.homepageFlag">ahernp.com</p>
        <p *ngIf="!breadcrumbService.homepageFlag">
            <a routerLink="/">ahernp.com</a>
            <span *ngFor="let breadcrumb of breadcrumbService.breadcrumbs">
                › <a routerLink="{{breadcrumb.url}}">{{breadcrumb.label}}</a>
            </span>
        </p>
`
})
export class HeaderComponent {
    @Input()
    page: Page;

    constructor (private breadcrumbService:BreadcrumbService) {}

    ngOnInit(): void {
        var breadcrumb = new Breadcrumb(this.page.title, this.page.slug, `/page/${this.page.slug}`);
        this.breadcrumbService.addBreadcrumb(breadcrumb);
    }
}
