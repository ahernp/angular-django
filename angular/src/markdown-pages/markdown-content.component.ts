import {Component, Input} from '@angular/core';

import * as showdown from 'showdown';

import {MarkdownPage} from './markdown-page';

@Component({
    selector: 'ad-markdown-content',
    template: `
        <div [innerHTML]="html_content"></div>
    `
})
export class MarkdownContentComponent {
    @Input() page: MarkdownPage;

    html_content: string;

    ngOnInit() {
        var converter = new showdown.Converter({'tables': true});
        this.html_content = converter.makeHtml(this.page.content);
    }
}
