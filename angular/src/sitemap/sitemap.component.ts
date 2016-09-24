import {Component, OnInit} from '@angular/core';

import {PageService} from '../pages/page.service';
import {Breadcrumb} from "../breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../breadcrumbs/breadcrumb.service";

import {dashboardTitle, dashboardUrl} from "../dashboard/dashboard.component";
import {homepageTitle, homepageUrl} from "../homepage/homepage.component";
import {rootTitle} from "../app.settings";

export const sitemapTitle: string = 'Site Map';
export const sitemapUrl: string = '/sitemap';

@Component({
    selector: 'ad-sitemap',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
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
        <ad-footer id="footer" *ngIf="sitemap" [page]="sitemap"></ad-footer>
        `,
    providers: []
})


export class SitemapComponent implements OnInit {
    title: string = sitemapTitle;
    breadcrumbs: Breadcrumb[];
    sitemap: Breadcrumb[];
    error: any;

    constructor(
        private pageService:PageService,
        private breadcrumbService:BreadcrumbService) {
    }

    ngOnInit(): void {
        this.getAllBreadcrumbs();
    }

    addClientsideBreadcrumbs() {
        var dashboardBreadcrumb = new Breadcrumb(dashboardTitle, dashboardUrl, '', rootTitle);
        this.sitemap.push(dashboardBreadcrumb);
        var homepageBreadcrumb = new Breadcrumb(homepageTitle, homepageUrl, '', rootTitle);
        this.sitemap.push(homepageBreadcrumb);
    }

    getAllBreadcrumbs() {
        this.pageService
            .getBreadcrumbs()
            .then(pageBreadcrumbs => {
                this.sitemap = pageBreadcrumbs;
                this.addClientsideBreadcrumbs()
                var now = new Date().toLocaleDateString();
                var breadcrumb = new Breadcrumb(sitemapTitle, sitemapUrl, now, rootTitle);
                this.breadcrumbs = this.breadcrumbService.addBreadcrumb(breadcrumb);
                this.addClientsideBreadcrumbs()
            })
            .catch(error => this.error = error);
    }
}
