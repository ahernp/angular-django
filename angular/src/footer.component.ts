import {Component, Input} from '@angular/core';

import { Page } from './page';
import {PageSourceComponent} from './page-source.component'

@Component({
    selector: 'ad-footer',
    directives: [PageSourceComponent],
    template: `
        <p>Updated {{page.updated}}</p>
    `
})
export class FooterComponent {
    @Input()
    page: Page;
}
