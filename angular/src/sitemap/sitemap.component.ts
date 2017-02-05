import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from '../core/breadcrumbs/breadcrumb';
import {BreadcrumbService} from '../core/breadcrumbs/breadcrumb.service';

import {Page} from '../pages/page';
import {PageService} from '../pages/page.service';

import {Footer} from "../core/footer/footer";

import {adminBreadcrumb, rootTitle} from '../app.settings';
import {Table} from '../core/table/table';

export const sitemapTitle: string = 'Site Map';
const columnHeadings: string[] = ['Title', 'Parent', 'Published', 'Updated'];

@Component({
    selector: 'ad-sitemap',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <h1>{{title}}</h1>
            <template [ngIf]="table">
                <input [(ngModel)]="filterString" (ngModelChange)="filterRows()" placeholder="Filter" tabindex="2">
                <span *ngIf="table.currentRows.length != table.rows.length">{{table.currentRows.length}} of</span>
                {{table.rows.length}} rows
                <table>
                    <thead>
                        <tr><th *ngFor="let columnHeading of table.columnHeadings; let i = index" (click)="table.sortRows(i)">{{columnHeading}}</th></tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let row of table.currentRows; let odd=odd; let even=even;" [ngClass]="{ odd: odd, even: even }">
                            <td><a routerLink="{{row[4]}}">{{row[0]}}</a></td>
                            <td>{{row[1]}}</td>
                            <td>{{row[2]}}</td>
                            <td>{{row[3]}}</td>
                        </tr>
                    </tbody>
                </table>
            </template>
        </div>
        <ad-footer id="footer" *ngIf="footer" [footer]="footer" (onShowEdit)="onShowEdit($event)"></ad-footer>

        <ad-page-edit *ngIf="showEdit" [page]="newPage" [adminBreadcrumb]="newPageAdminBreadcrumb" (onShowEdit)="onShowEdit($event)"></ad-page-edit>
        `,
    providers: []
})
export class SitemapComponent implements OnInit {
    title: string = sitemapTitle;
    parent_slug: string;
    breadcrumbs: Breadcrumb[];

    sitemap: Breadcrumb[];
    table: Table;
    filterString: string;

    footer: Footer;

    showEdit: boolean = false;
    newPage: Page;
    newPageAdminBreadcrumb: Breadcrumb;

    constructor(
        private pageService: PageService,
        private breadcrumbService: BreadcrumbService,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle(sitemapTitle);
        this.route.params
            .subscribe((params: Params) => {
                this.parent_slug = params['slug'];
                this.getBreadcrumbs();
                this.populateHeaderAndTitle();
                this.populateFooter();
            });

        this.newPage = new Page();
        this.newPageAdminBreadcrumb = <Breadcrumb>{
            title: 'Admin',
            url: `/admin/pages/add/`,
            externalLinkFlag: true,
            loggedInRequiredFlag: true
        }
    }

    populateHeaderAndTitle() {
        if (this.parent_slug == undefined) {
            this.populateHeader(sitemapTitle);
            this.title = sitemapTitle;
            this.titleService.setTitle(sitemapTitle);
        }
        else {
            var parent = this.pageService.getPage(this.parent_slug)
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
                parentName: rootTitle
            }
        );
    }

    populateFooter() {
        this.footer = <Footer>{
            editFlag: true,
        };
    }

    populateTable(breadcrumbs: Breadcrumb[]): void {
        this.sitemap = breadcrumbs.slice(0);

        this.sitemap.sort(function (a, b) {
            return a.title.toLowerCase().localeCompare(
                b.title, 'en', {'sensitivity': 'base'});
        });

        let row: string[][] = [];
        for (let breadcrumb of this.sitemap)
            row.push([breadcrumb.title, breadcrumb.parentName, breadcrumb.published, breadcrumb.updated, breadcrumb.url]);
        this.table = new Table(columnHeadings, row);
    }

    getBreadcrumbs() {
        this.pageService.getPageBreadcrumbs(this.parent_slug)
            .subscribe(breadcrumbs => this.populateTable(breadcrumbs));
    }

    filterRows(): void {
        this.table.setFilterString(this.filterString);
    }

    onShowEdit(showEdit: boolean) {
        this.showEdit = showEdit;
    }
}
