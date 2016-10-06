import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {MarkdownPageService} from '../markdown-pages/markdown-page.service';

import {Footer} from "../core/footer/footer";

import {dashboardTitle, dashboardUrl} from "../dashboard/dashboard.component";
import {rootTitle, toDateTimeString, rootBreadcrumb, adminBreadcrumb} from "../app.settings";

export const sitemapTitle: string = 'Site Map';

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
        private router: Router,
        private titleService:Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle(sitemapTitle);
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
        this.sitemap.push(rootBreadcrumb);
    }

    populateHeaderAndTitle() {
        if (this.parent_slug == undefined) {
            this.populateHeader(sitemapTitle);
            this.title = sitemapTitle;
            this.titleService.setTitle(sitemapTitle);
        }
        else {
            var parent = this.markdownPageService
                .getPage(this.parent_slug)
                .then(page => {
                    this.populateHeader(page.title);
                    this.title = page.title;
                    this.titleService.setTitle(page.title);
                })
                .catch(error => this.error = error);
        }

    }

    populateHeader(title:string) {
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(<Breadcrumb>
            {
                title: title,
                url: this.router.url,
                updated: this.now,
                parentName: rootTitle
            }
        );
    }

    populateFooter() {
        this.footer = new Footer({
            updated: this.now,
            breadcrumbs: [adminBreadcrumb],
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
