import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from '../core/breadcrumbs/breadcrumb';
import {BreadcrumbService} from '../core/breadcrumbs/breadcrumb.service';

import {Footer} from "../core/footer/footer";

import {Page} from '../pages/page';
import {PageService} from '../pages/page.service';

import {Table, Row} from '../core/table/table';

import {rootTitle} from '../app.settings';

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
                <span *ngIf="table.currentRows.length != table.allRows.length">{{table.currentRows.length}} of</span>
                {{table.allRows.length}} rows
                <table>
                    <thead>
                        <tr><th *ngFor="let columnHeading of table.columnHeadings; let i = index" (click)="table.sortRows(i)">{{columnHeading}}</th></tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let row of table.currentRows; let odd=odd; let even=even;" [ngClass]="{odd: odd, even: even}">
                            <td><a routerLink="{{row.item.url}}">{{row.item.title}}</a></td>
                            <td>{{row.item.parentName}}</td>
                            <td>{{row.item.published}}</td>
                            <td>{{row.item.updated}}</td>
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
    breadcrumbs: Breadcrumb[];
    filterString: string;
    footer: Footer;
    newPage: Page;
    newPageAdminBreadcrumb: Breadcrumb;
    parent_slug: string;
    showEdit: boolean = false;
    sitemap: Breadcrumb[];
    table: Table;
    title: string = sitemapTitle;

    constructor(
        private pageService: PageService,
        private breadcrumbService: BreadcrumbService,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title
    ) {}

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

    getBreadcrumbs(): void {
        this.pageService.getPageBreadcrumbs(this.parent_slug)
            .subscribe(breadcrumbs => this.populateTable(breadcrumbs));
    }

    filterRows(): void {
        this.table.setFilterString(this.filterString);
    }

    onShowEdit(showEdit: boolean): void {
        this.showEdit = showEdit;
    }

    populateFooter(): void {
        this.footer = <Footer>{
            editFlag: true,
        };
    }

    populateHeader(title:string): void {
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(<Breadcrumb>
            {
                title: title,
                url: this.router.url,
                parentName: rootTitle
            }
        );
    }

    populateHeaderAndTitle(): void {
        if (this.parent_slug == undefined) {
            this.populateHeader(sitemapTitle);
            this.title = sitemapTitle;
            this.titleService.setTitle(sitemapTitle);
        }
        else {
            this.pageService.getPage(this.parent_slug)
                .subscribe(page => {
                    this.populateHeader(page.title);
                    this.title = page.title;
                    this.titleService.setTitle(page.title);
                });
        }
    }

    populateTable(breadcrumbs: Breadcrumb[]): void {
        this.sitemap = breadcrumbs.slice(0);

        this.sitemap.sort(function (a, b) {
            return a.title.toLowerCase().localeCompare(b.title, 'en', {'sensitivity': 'base'});
        });

        let rows: Row[] = [];
        for (let breadcrumb of this.sitemap)
            rows.push(<Row>{
                columns: [breadcrumb.title, breadcrumb.parentName, breadcrumb.published, breadcrumb.updated],
                item: breadcrumb
            });
        this.table = new Table(columnHeadings, rows);
    }
}
