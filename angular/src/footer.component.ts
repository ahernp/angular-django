import {Component, Input} from '@angular/core';

import { Page } from './page';
import {PageSourceComponent} from './page-source.component'

@Component({
    selector: 'ad-footer',
    directives: [PageSourceComponent],
    template: `
        <p>
            Footer
            <page-source [page]="currentPage"></page-source>
        </p>
    `
})
export class FooterComponent {
    @Input()
    currentPage: Page;
}