import {Component, Input} from '@angular/core';

import {MarkdownPage} from './markdown-pages/markdown-page';

@Component({
    selector: 'ad-footer',
    template: `
        <p>Updated {{page.updated}}</p>
    `
})
export class FooterComponent {
    @Input()
    page: MarkdownPage;
}
