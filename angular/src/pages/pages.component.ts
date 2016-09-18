import {Component, OnInit} from '@angular/core';

import {HeaderComponent} from '../header.component'
import {ContentComponent} from '../content.component'
import {FooterComponent} from '../footer.component'

import {Page} from './page';
import {PageService} from './page.service';

@Component({
    selector: 'ad-pages',
    directives: [
        HeaderComponent,
        ContentComponent,
        FooterComponent
    ],
    template: `
        <ad-header></ad-header>
        <ad-content [page]="currentPage"></ad-content>
        <ad-footer [page]="currentPage"></ad-footer>
        
        <h2>Current Page</h2>
        <div *ngIf="currentPage">{{currentPage.title}}</div>
        <h2>Pages</h2>
        <ul>
            <li *ngFor="let page of pages">{{page.title}}</li>
        </ul>
        `,
    providers: []
})


export class PagesComponent implements OnInit {
    pages: Page[];
    currentPage: Page;
    error: any;

    private homePageSlug = 'ahernp-com';

    constructor(private pageService:PageService) {
    }

    ngOnInit() {
        this.getPages();
        this.getCurrentPage(this.homePageSlug);
    }

    getPages() {

        this.pageService
            .getPages()
            .then(pages => this.pages = pages)
            .catch(error => this.error = error);

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
