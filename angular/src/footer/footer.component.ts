import {Component, Input} from '@angular/core';

import {Footer} from './footer';

@Component({
    selector: 'ad-footer',
    template: `
        <p>
            <span *ngIf="footer.updated">Last Updated: {{footer.updated}}</span>
            <span *ngFor="let breadcrumb of footer.breadcrumbs">
                <a routerLink="{{breadcrumb.url}}">{{breadcrumb.title}}</a>
            </span>
            <span *ngIf="footer.adminUrl"><a href="{{footer.adminUrl}}">Edit</a></span>
        </p>
    `
})
export class FooterComponent {
    @Input()
    footer: Footer;
}
