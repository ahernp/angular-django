import {Component, Input} from '@angular/core';

import { Page } from './page';

@Component({
    selector: 'ad-content',
    template: `
        <h3>{{page?.title}}</h3>
    `
})
export class ContentComponent {
    @Input()
    page: Page;
}
