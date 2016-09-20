import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'

import {Page} from './page';
import {PageService} from './page.service';
import {Breadcrumb} from "../breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../breadcrumbs/breadcrumb.service";

@Component({
    selector: 'ad-page',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <ad-content id="content" *ngIf="currentPage" [page]="currentPage"></ad-content>
        <ad-footer id="footer" *ngIf="currentPage" [page]="currentPage"></ad-footer>
        `,
    providers: []
})


export class PageDetailComponent implements OnInit {
    currentPage: Page;
    breadcrumbs: Breadcrumb[];
    error: any;

    constructor(
        private pageService:PageService,
        private breadcrumbService:BreadcrumbService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getCurrentPage(this.route.snapshot.params['slug']);
    }

    getCurrentPage(slug:string) {
        this.pageService
            .getPage(slug)
            .then(page => {
                this.currentPage = page;
                var breadcrumb = new Breadcrumb(this.currentPage.title, `/page/${this.currentPage.slug}`);
                this.breadcrumbs = this.breadcrumbService.addBreadcrumb(breadcrumb);
            })
            .catch(error => this.error = error);
    }
}
