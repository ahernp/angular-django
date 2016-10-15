import {Component, Input} from '@angular/core';

import {Page} from './page';

@Component({
    selector: 'ad-page-source',
    template: `
        <h2>Source Code</h2>
        <pre>{{page.content}}</pre>
    `
})
export class PageSourceComponent {
    @Input() page: Page;
}
