import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from './header.component'
import {ContentComponent} from './content.component'
import {FooterComponent} from './footer.component'

import { Page } from './page';
import { PageService } from './page.service';

@Component({
    selector: 'ad-app',
    directives: [HeaderComponent, ContentComponent, FooterComponent],
    template: `
        <ad-header></ad-header>
        <ad-content></ad-content>
        <ad-footer [currentPage]="pages[0]"></ad-footer>
        `,
    providers: [PageService]
})


export class AppComponent implements OnInit {
    currentPage: Page = {id: 99, title: 'Current', content: 'currentPage Content'};
    pages: Page[];

    constructor(private pageService: PageService) { }

    getPages() {
        this.pages = this.pageService.getPages().then(pages => this.pages = pages);;
    }

    ngOnInit() {
        this.getPages();
    }
}
