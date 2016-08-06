import {Component, OnInit} from '@angular/core';

import {HeaderComponent} from './header.component'
import {ContentComponent} from './content.component'
import {FooterComponent} from './footer.component'

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
        <ad-content></ad-content>
        <ad-footer [currentPage]="currentPage"></ad-footer>
        <h2>Pages</h2>
        <ul class="pages">
            <li *ngFor="let page of pages">{{page.title}}</li>
        </ul>
        `,
    providers: []
})


export class PagesComponent implements OnInit {
    pages:Page[];
    currentPage: Page;

    constructor(private pageService:PageService) {
    }

    ngOnInit() {
        this.getPages();
    }

    getPages() {
        this.pageService.getPages().then(pages => this.pages = pages);
    }

    setCurrentPage(page:Page) {
        this.currentPage = page;
    }
}
