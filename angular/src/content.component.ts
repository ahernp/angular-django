import {Component, Input} from '@angular/core';

import { Page } from './page';

@Component({
    selector: 'ad-content',
    template: `
        <h3>Title</h3>
        <p>{{title}}</p>
        <h3>Page Title</h3>
        <p>"{{page?.title}}"</p>
    `
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
