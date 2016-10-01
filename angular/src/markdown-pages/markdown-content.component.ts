import {Component, Input} from '@angular/core';

import {MarkdownPage} from './markdown-page';

@Component({
    selector: 'ad-markdown-content',
    template: `
        <div [innerHTML]="page.content|markdown"></div>
    `
})
export class MarkdownContentComponent {
    @Input() page: MarkdownPage;
}
