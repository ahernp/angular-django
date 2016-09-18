import {Component, Input} from '@angular/core';

import {Page} from './pages/page';
import {PageSourceComponent} from './pages/page-source.component'

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
