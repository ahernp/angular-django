import {Component, OnInit} from '@angular/core';

import {MarkdownPageService} from '../markdown-pages/markdown-page.service';
import {Breadcrumb} from "../breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../breadcrumbs/breadcrumb.service";

import {dashboardTitle, dashboardUrl} from "../dashboard/dashboard.component";
import {homepageTitle, homepageUrl} from "../homepage/homepage.component";
import {rootTitle, toDateTimeString} from "../app.settings";

export const sitemapTitle: string = 'Site Map';
export const sitemapUrl: string = '/sitemap';

@Component({
    selector: 'ad-sitemap',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <h1>{{title}}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Parent</th>
                        <th>Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let row of sitemap">
                        <td><a routerLink="{{row.url}}">{{row.title}}</a></td>
                        <td>{{row.parentName}}</td>
                        <td>{{row.updated}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ad-footer id="footer" *ngIf="sitemap" [page]="sitemap"></ad-footer>
        `,
    providers: []
})


export class SitemapComponent implements OnInit {
    title: string = sitemapTitle;
    now: string;
    breadcrumbs: Breadcrumb[];
    sitemap: Breadcrumb[];
    error: any;

    constructor(
        private markdownPageService:MarkdownPageService,
        private breadcrumbService:BreadcrumbService) {
    }

    ngOnInit(): void {
        this.now = toDateTimeString(new Date());
        this.getAllBreadcrumbs();
    }

    addClientsideEntries() {
        var dashboardBreadcrumb = new Breadcrumb(dashboardTitle, dashboardUrl, this.now, rootTitle);
        this.sitemap.push(dashboardBreadcrumb);
        var homepageBreadcrumb = new Breadcrumb(homepageTitle, homepageUrl, '', rootTitle);
        this.sitemap.push(homepageBreadcrumb);
    }

    getAllBreadcrumbs() {
        this.markdownPageService
            .getBreadcrumbs()
            .then(pageBreadcrumbs => {
                this.sitemap = pageBreadcrumbs;
                this.addClientsideEntries();
                var breadcrumb = new Breadcrumb(sitemapTitle, sitemapUrl, this.now, rootTitle);
                this.breadcrumbs = this.breadcrumbService.addBreadcrumb(breadcrumb);
            })
            .catch(error => this.error = error);
    }
}
