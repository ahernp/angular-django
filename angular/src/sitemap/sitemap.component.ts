import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {PageService} from '../pages/page.service';

import {Footer} from "../core/footer/footer";

import {dashboardTitle, dashboardUrl} from "../dashboard/dashboard.component";
import {rootTitle, rootBreadcrumb, adminBreadcrumb} from "../app.settings";
import {toDateTimeString} from "../utilities";

export const sitemapTitle: string = 'Site Map';
const columnHeadings: string[] = ['Title', 'Parent', 'Updated']

var filterableStrings: string[];

@Component({
    selector: 'ad-sitemap',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <h1>{{title}}</h1>
            <input [(ngModel)]="filterString" (ngModelChange)="filterRows()" placeholder="Filter">
            <table>
                <thead>
                    <tr><th *ngFor="let columnHeading of columnHeadings">{{columnHeading}}</th></tr>
                </thead>
                <tbody>
                    <tr *ngFor="let row of currentRows">
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

    filterString: string;
    columnHeadings: string[] = columnHeadings;
    currentRows: Breadcrumb[];

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

    populateFilterStrings() {
        filterableStrings = [];
        for (let breadcrumb of this.sitemap) {
            let searchableStrings = [];
            for (let attribute of ['url', 'title', 'parentName', 'updated'])
                if (breadcrumb[attribute] != undefined)
                    searchableStrings.push(breadcrumb[attribute].toLocaleLowerCase())
            filterableStrings.push(searchableStrings.toString());
        }
    }

    filterRows(): void {
        if (this.filterString.length < 3) {
            this.currentRows = this.sitemap;
            return;
        }
        var filterString = this.filterString.toLocaleLowerCase();
        this.currentRows = this.sitemap.filter(
            (value, index) => filterableStrings[index].indexOf(filterString) != -1);
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
                this.currentRows = this.sitemap;
                this.populateFilterStrings();
            })
            .catch(error => this.error = error);
    }
}
