import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'

import {HeaderComponent} from './header.component'
import {ContentComponent} from './content.component'
import {FooterComponent} from './footer.component'

import {Page} from './page';
import {PageService} from './page.service';

@Component({
    selector: 'ad-page',
    directives: [
        HeaderComponent,
        ContentComponent,
        FooterComponent
    ],
    template: `
        <ad-header *ngIf="currentPage" [page]="currentPage"></ad-header>
        <ad-content *ngIf="currentPage" [page]="currentPage"></ad-content>
        <ad-footer *ngIf="currentPage" [page]="currentPage"></ad-footer>
        `,
    providers: []
})


export class PageDetailComponent implements OnInit {
    currentPage: Page;
    error: any;

    private homePageSlug = 'ahernp-com';

    constructor(
        private pageService:PageService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let slug = params['slug'];
            this.getCurrentPage(slug);
        });
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
