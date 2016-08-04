import {Component} from '@angular/core';
import {HeaderComponent} from './header.component'
import {ContentComponent} from './content.component'
import {FooterComponent} from './footer.component'

import { Page } from './page';

@Component({
    selector: 'ad-app',
    directives: [HeaderComponent, ContentComponent, FooterComponent],
    template: `
        <ad-header></ad-header>
        <ad-content></ad-content>
        <ad-footer [currentPage]="currentPage"></ad-footer>
        `
})


export class AppComponent {
    currentPage: Page = {id: 99, title: 'Current', content: 'currentPage Content'};
}
