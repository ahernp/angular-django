import {Component, Input} from '@angular/core';

import * as showdown from 'showdown';

import {Page} from './pages/page';

@Component({
    selector: 'ad-content',
    template: `
        <div [innerHTML]="html_content"></div>
        <page-source [page]="page"></page-source>
    `
})
export class ContentComponent {
    @Input()
    page: Page;
    html_content: string;

    ngOnInit() {
        var converter = new showdown.Converter({'tables': true});
        this.html_content = converter.makeHtml(this.page.content);
    }
}
