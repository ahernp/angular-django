import {Component, Input} from '@angular/core';

@Component({
    selector: 'ad-markdown-content',
    template: `
        <div [innerHTML]="content|markdown"></div>
    `
})
export class MarkdownComponent {
    @Input() content: string;
}
