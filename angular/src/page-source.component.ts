import { Component, Input } from '@angular/core';

import { Page } from './page';

@Component({
    selector: 'page-source',
    template: `
        <div *ngIf="page">
            <pre>{{page.content}}</pre>
        </div>
    `
})
export class PageSourceComponent {
    @Input()
    page: Page;
}
