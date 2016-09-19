import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'

import {Page} from './page';
import {PageService} from './page.service';

@Component({
    selector: 'ad-page',
    template: `
        <ad-header id="header" *ngIf="currentPage" [page]="currentPage"></ad-header>
        <ad-content id="content" *ngIf="currentPage" [page]="currentPage"></ad-content>
        <ad-footer id="footer" *ngIf="currentPage" [page]="currentPage"></ad-footer>
        `,
    providers: []
})


export class PageDetailComponent implements OnInit {
    currentPage: Page;
    error: any;

    constructor(
        private pageService:PageService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getCurrentPage(this.route.snapshot.params['slug']);
    }

    getCurrentPage(slug:string) {
        this.pageService
            .getPage(slug)
            .then(page => {
                this.currentPage = page
            })
            .catch(error => this.error = error);
    }
}
