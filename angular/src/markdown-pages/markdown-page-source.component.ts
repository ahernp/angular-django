import {Component, Input} from '@angular/core';

import {MarkdownPage} from './markdown-page';

@Component({
    selector: 'ad-page-source',
    template: `
        <h2>Markdown Source</h2>
        <pre>{{page.content}}</pre>
    `
})
export class MarkdownPageSourceComponent {
    @Input() page: MarkdownPage;
}
