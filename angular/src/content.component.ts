import {Component, Input} from '@angular/core';

import { Page } from './page';

@Component({
    selector: 'ad-content',
    template: '<p>Content</p>'
})
export class ContentComponent {
    @Input()
    page: Page;

    @Input()
    title: string;

    ngOnInit() {
        console.log(this.page);
        console.log(this.title);
  }
}
