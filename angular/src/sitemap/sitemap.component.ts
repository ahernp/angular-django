import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'

import {MarkdownPageService} from '../markdown-pages/markdown-page.service';
import {Breadcrumb} from "../breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../breadcrumbs/breadcrumb.service";

import {dashboardTitle, dashboardUrl} from "../dashboard/dashboard.component";
import {homepageTitle, homepageUrl} from "../homepage/homepage.component";
import {rootTitle, toDateTimeString} from "../app.settings";
import {Footer} from "../footer/footer";

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
        <ad-footer id="footer" *ngIf="footer" [footer]="footer"></ad-footer>
        `,
    providers: []
})


export class SitemapComponent implements OnInit {
    title: string = sitemapTitle;
    now: string;
    parent_slug: string;
    breadcrumbs: Breadcrumb[];
    sitemap: Breadcrumb[];
    footer: Footer;
    error: any;

    constructor(
        private markdownPageService:MarkdownPageService,
        private breadcrumbService:BreadcrumbService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        this.now = toDateTimeString(new Date());
        this.route.params.forEach((params: Params) => {
            this.parent_slug = params['slug'];
            this.now = toDateTimeString(new Date());
            this.getBreadcrumbs();
            this.populateHeaderAndTitle();
            this.populateFooter();
        });
    }

    addClientsideEntries() {
        var dashboardBreadcrumb = new Breadcrumb({
            title: dashboardTitle,
            url: dashboardUrl,
            updated: this.now,
            parentName: rootTitle});
        this.sitemap.push(dashboardBreadcrumb);
        var homepageBreadcrumb = new Breadcrumb({
            title: homepageTitle,
            url: homepageUrl,
            parentName: rootTitle});
        this.sitemap.push(homepageBreadcrumb);
    }

    populateHeaderAndTitle() {
        if (this.parent_slug == undefined) {
            this.populateHeader(sitemapTitle);
            this.title = sitemapTitle;
        }
        else {
            var parent = this.markdownPageService
                .getPage(this.parent_slug)
                .then(page => {
                    this.populateHeader(page.title);
                    this.title = page.title;
                })
                .catch(error => this.error = error);
        }

    }

    populateHeader(title:string) {
        var breadcrumb = new Breadcrumb({
            title: title,
            url: this.router.url,
            updated: this.now,
            parentName: rootTitle});
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(breadcrumb);
    }

    populateFooter() {
        this.footer = new Footer({
            updated: this.now,
            adminUrl: `/admin/`,
        });
    }

    getBreadcrumbs() {
        this.markdownPageService
            .getPageBreadcrumbs(this.parent_slug)
            .then(pageBreadcrumbs => {
                this.sitemap = pageBreadcrumbs;
                if (this.parent_slug == undefined)
                    this.addClientsideEntries();
            })
            .catch(error => this.error = error);
    }
}
