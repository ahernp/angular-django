import {Component, Input} from '@angular/core';

import {Page} from './page';

class Breadcrumb {
    label: string;
    url: string;

    constructor(label:string, url:string) {
        this.label = label;
        this.url = url;
    }
}

@Component({
    selector: 'ad-header',
    template: `
        <span *ngFor="let breadcrumb of breadcrumbs">
            <a href="{{breadcrumb.url}}">{{breadcrumb.label}}</a> ›
        </span>
`
})
export class HeaderComponent {
    @Input()
    page: Page;
    breadcrumbs: Breadcrumb[];

    ngOnInit() {
        this.breadcrumbs = [];
        if (this.page != undefined)
            if (this.page.slug == 'ahernp-com')
                this.breadcrumbs = [new Breadcrumb('ahernp.com', '/')];
            else
                this.breadcrumbs.push(new Breadcrumb(this.page.title, this.page.slug))
    }
}
