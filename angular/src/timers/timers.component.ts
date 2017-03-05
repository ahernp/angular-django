import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";
import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";

import {Footer} from "../core/footer/footer";

import {rootTitle} from "../app.settings";

const timersTitle: string = 'Timers';
const timersUrl: string = '/timers';
export const timersBreadcrumb = <Breadcrumb>
    {title: timersTitle, url: timersUrl, parentName: rootTitle};

@Component({
    selector: 'ad-timers',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>

        <div id="content">
            <h2>Paul Ahern</h2>
            <p>Age: <ad-timer targetTimeString="1969-12-05T14:00:00Z"></ad-timer>.
            <p>Time at Affectv: <ad-timer targetTimeString="2016-02-17T10:00:00Z"></ad-timer>.
            <p>Life expectancy: <ad-timer targetTimeString="2039-12-05T14:00:00Z"></ad-timer>.
            <h2>Nikki Rosenberg</h2>
            <p>Time since last cigarette: <ad-timer targetTimeString="2015-08-04T11:00:00Z"></ad-timer>.
        </div>

        <ad-footer id="footer" *ngIf="footer" [footer]="footer"></ad-footer>
    `,
    providers: []
})
export class TimersComponent implements OnInit {
    breadcrumbs: Breadcrumb[];
    footer: Footer;

    constructor(
        private breadcrumbService:BreadcrumbService,
        private titleService:Title
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle(timersTitle);
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(timersBreadcrumb);
        this.footer = new Footer();
    }
}
