import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {PageService} from '../pages/page.service';

import {Footer} from "../core/footer/footer";

import {dashboardTitle, dashboardUrl} from "../dashboard/dashboard.component";
import {rootTitle, rootBreadcrumb, adminBreadcrumb} from "../app.settings";
import {Table} from "../core/table/table";
import {toDateTimeString} from "../utilities";

export const sitemapTitle: string = 'Site Map';
const columnHeadings: string[] = ['Title', 'Parent', 'Updated']

@Component({
    selector: 'ad-sitemap',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <h1>{{title}}</h1>
            <template [ngIf]="table">
                <input [(ngModel)]="filterString" (ngModelChange)="filterRows()" placeholder="Filter">
                <span *ngIf="table.currentRows.length != table.rows.length">{{table.currentRows.length}} of</span>
                {{table.rows.length}} rows
                <table>
                    <thead>
                        <tr><th *ngFor="let columnHeading of table.columnHeadings; let i = index" (click)="table.sortRows(i)">{{columnHeading}}</th></tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let row of table.currentRows">
                            <td><a routerLink="{{row[3]}}">{{row[0]}}</a></td>
                            <td>{{row[1]}}</td>
                            <td>{{row[2]}}</td>
                        </tr>
                    </tbody>
                </table>
            </template>
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
    table: Table;
    filterString: string;

    footer: Footer;
    error: any;

    constructor(
        private pageService: PageService,
        private breadcrumbService: BreadcrumbService,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title) {
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
            var parent = this.pageService
                .getPage(this.parent_slug)
                .subscribe(page => {
                    this.populateHeader(page.title);
                    this.title = page.title;
                    this.titleService.setTitle(page.title);
                });
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
        this.pageService
            .getPageBreadcrumbs(this.parent_slug)
            .then(pageBreadcrumbs => {
                this.sitemap = pageBreadcrumbs;
                if (this.parent_slug == undefined)
                    this.addClientsideEntries();
                this.sitemap.sort(function (a, b) {
                    return a.title.toLowerCase().localeCompare(
                        b.title, 'en', {'sensitivity': 'base'});
                });
                let row: string[][] = [];
                for (let breadcrumb of this.sitemap)
                    row.push([breadcrumb.title, breadcrumb.parentName, breadcrumb.updated, breadcrumb.url]);
                this.table = new Table(columnHeadings, row);
            })
            .catch(error => this.error = error);
    }

    filterRows(): void {
        this.table.setFilterString(this.filterString);
    }
}
