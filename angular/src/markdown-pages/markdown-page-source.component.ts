import {Component, Input} from '@angular/core';

import {MarkdownPage} from './markdown-page';

@Component({
    selector: 'page-source',
    template: `
        <div *ngIf="page">
            <pre>{{page.content}}</pre>
        </div>
    `
})
export class MarkdownPageSourceComponent {
    @Input() page: MarkdownPage;
}
