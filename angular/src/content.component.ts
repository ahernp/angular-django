import {Component, Input} from '@angular/core';

import {Page} from './page';

@Component({
    selector: 'ad-content',
    template: `
        {{page.content}}
        <page-source [page]="page"></page-source>
    `
})
export class ContentComponent {
    @Input()
    page: Page;
}
