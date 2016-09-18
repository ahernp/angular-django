import {Component, Input} from '@angular/core';

import {Page} from './pages/page';

@Component({
    selector: 'ad-footer',
    template: `
        <p>Updated {{page.updated}}</p>
    `
})
export class FooterComponent {
    @Input()
    page: Page;
}
