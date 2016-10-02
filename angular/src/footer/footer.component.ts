import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Footer} from './footer';
import {markdownBreadcrumb} from "../app.settings";

@Component({
    selector: 'ad-footer',
    template: `
        <p>
            <span *ngIf="footer.updated">Last Updated: {{footer.updated}}</span>
            <span *ngIf="footer.sourceFlag" id="source_label" (click)="toggleSource()">Source</span>
            <span *ngIf="footer.markdownFlag">
                <a routerLink="{{markdown.url}}">{{markdown.title}}</a>
            </span>
            <span *ngIf="footer.adminUrl"><a href="{{footer.adminUrl}}">Edit</a></span>
            <span *ngFor="let breadcrumb of footer.routerLinks">
                <a routerLink="{{breadcrumb.url}}">{{breadcrumb.title}}</a>
            </span>
            <span *ngFor="let breadcrumb of footer.links">
                <a href="{{breadcrumb.url}}">{{breadcrumb.title}}</a>
            </span>
        </p>
    `
})
export class FooterComponent {
    @Input() footer: Footer;
    @Output() onToggleSource = new EventEmitter<boolean>();

    showSource:boolean = false;
    markdown = markdownBreadcrumb;

    toggleSource() {
        this.showSource = !this.showSource;
        this.onToggleSource.emit(this.showSource);
    }

}
