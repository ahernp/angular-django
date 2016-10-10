import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";
import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

import {Footer} from "../core/footer/footer";

import {toDateTimeString, adminBreadcrumb} from "../app.settings";

const timersTitle: string = 'Timers';
const timersBreadcrumb = new Breadcrumb({title: 'Timers', url: '/timers'});

@Component({
    moduleId: module.id,
    selector: 'ad-timers',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        
        <div id="content">
            <h2>Timers</h2>
        </div>
        
        <ad-footer id="footer" *ngIf="footer" [footer]="footer"></ad-footer>
    `,
    providers: []
})
export class TimersComponent implements OnInit {
    now: string;
    breadcrumbs: Breadcrumb[];
    footer: Footer;

    constructor(
        private breadcrumbService:BreadcrumbService,
        private titleService:Title) {
    }

    ngOnInit(): void {
        this.now = toDateTimeString(new Date());
        this.titleService.setTitle(timersTitle);
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(timersBreadcrumb);
        this.footer = new Footer({
            updated: this.now,
            breadcrumbs: [adminBreadcrumb],
        });
    }
}
