import {Component, Input} from '@angular/core';

import {Page} from './page';

@Component({
    selector: 'ad-markdown-content',
    template: `
        <div [innerHTML]="page.content|markdown"></div>
    `
})
export class MarkdownComponent {
    @Input() page: Page;
}
