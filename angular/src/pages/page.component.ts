import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {Page} from './page';
import {PageService} from './page.service';

import {Footer} from "../core/footer/footer";

import {rootSlug} from "../app.settings";

const markdownBreadcrumb = <Breadcrumb>{title: 'Markdown', url: '/page/markdown'};

@Component({
    selector: 'ad-page',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <h2 class="published_date" *ngIf="page && page.published">{{page.published|date:'d MMMM y'}}</h2>

            <h1 *ngIf="page && page.contentType == 'markdown' && page.title">{{page.title}}</h1>

            <p *ngIf="page && page.contentType != 'homepage'">
                <ad-breadcrumb *ngFor="let breadcrumb of childBreadcrumbs" [breadcrumb]="breadcrumb"></ad-breadcrumb>
            </p>

            <ad-markdown-content *ngIf="page && page.contentType == 'markdown'" [content]="page.content"></ad-markdown-content>
            <ad-homepage *ngIf="page && page.contentType == 'homepage'" [content]="page.content"></ad-homepage>
            <ad-tablecontent *ngIf="page && page.contentType == 'table'" [content]="page.content"></ad-tablecontent>
            <ad-gallerycontent *ngIf="page && page.contentType == 'gallery'" [content]="page.content"></ad-gallerycontent>

            <ad-page-source *ngIf="showSource" [page]="page"></ad-page-source>
        </div>
        <ad-footer id="footer" *ngIf="footer" [footer]="footer" (onToggleSource)="onToggleSource($event)" (onRefresh)="onRefresh()" (onShowEdit)="onShowEdit($event)"></ad-footer>

        <ad-page-edit *ngIf="showEdit" [page]="page" [adminBreadcrumb]="adminBreadcrumb" (onShowEdit)="onShowEdit($event)"></ad-page-edit>
        `,
    providers: []
})
export class PageComponent implements OnInit {
    page: Page;
    adminBreadcrumb: Breadcrumb;
    breadcrumbs: Breadcrumb[];
    childBreadcrumbs: Breadcrumb[];
    footer: Footer;
    showSource: boolean = false;
    showEdit: boolean = false;

    constructor(
        private pageService: PageService,
        private breadcrumbService: BreadcrumbService,
        private route: ActivatedRoute,
        private titleService: Title) {
    }

    ngOnInit(): void {
        this.route.params
            .map(params => params['slug'] ? params['slug'] : rootSlug)
            .switchMap(slug => this.pageService.getPage(slug))
            .subscribe(page => this.populatePage(page));
    }

    populatePage(page: Page): void {
        this.page = page;
        this.titleService.setTitle(page.title);

        var breadcrumb = <Breadcrumb>{
            title: page.title,
            url: page.url,
            updated: page.updated,
            parentName: page.parentName};
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(breadcrumb);

        this.footer = <Footer>{
            breadcrumbs: [
                markdownBreadcrumb,
            ],
            editFlag: true,
            refreshFlag: true,
            sourceFlag: true,
            updated: page.updated,
        };

        this.childBreadcrumbs = page.children;

        this.adminBreadcrumb = <Breadcrumb>{
            title: 'Admin',
            url: `/admin/pages/page/${page.id}/change/`,
            externalLinkFlag: true,
            loggedInRequiredFlag: true
        }
    }

    onRefresh() {
        this.pageService.refresh(this.page.url)
            .subscribe(page => this.populatePage(page));
    }

    onShowEdit(showEdit: boolean) {
        this.showEdit = showEdit;
    }

    onToggleSource(showSource: boolean) {
        this.showSource = showSource;
    }
}
