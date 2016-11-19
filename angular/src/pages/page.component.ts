import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {Page} from './page';
import {PageService} from './page.service';

import {Footer} from "../core/footer/footer";

import {markdownBreadcrumb, rootSlug} from "../app.settings";

@Component({
    selector: 'ad-page',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <h2 class="published_date" *ngIf="page && page.published">{{page.published|date:'d MMMM y'}}</h2>
            <template [ngIf]="page && page.contentType == 'markdown'">
                <h1>{{page.title}}</h1>
                <template ngFor let-breadcrumb [ngForOf]="childBreadcrumbs">
                    <ad-breadcrumb [breadcrumb]="breadcrumb"></ad-breadcrumb>
                </template>
                <ad-markdown-content [content]="page.content"></ad-markdown-content>
            </template>
            <ad-homepage *ngIf="page && page.contentType == 'homepage'" [content]="page.content"></ad-homepage>
            <ad-tablecontent *ngIf="page && page.contentType == 'table'" [content]="page.content"></ad-tablecontent>
            <ad-page-source *ngIf="showSource" [page]="page"></ad-page-source>
        </div>
        <ad-footer id="footer" *ngIf="footer" [footer]="footer" (onToggleSource)="onToggleSource($event)"></ad-footer>
        `,
    providers: []
})
export class PageComponent implements OnInit {
    page: Page;
    breadcrumbs: Breadcrumb[];
    childBreadcrumbs: Breadcrumb[];
    footer: Footer;
    showSource: boolean = false;
    error: any;

    constructor(
        private pageService: PageService,
        private breadcrumbService: BreadcrumbService,
        private route: ActivatedRoute,
        private titleService: Title) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => this.getCurrentPage(params['slug']));
    }

    getCurrentPage(slug: string) {
        if (slug == undefined)
            slug = rootSlug;
        this.pageService
            .getPage(slug)
            .then(page => {
                this.page = page;
                this.titleService.setTitle(this.page.title);

                var breadcrumb = new Breadcrumb({
                    title: this.page.title,
                    url: this.page.url,
                    updated: this.page.updated,
                    parentName: this.page.parentName});
                this.breadcrumbs = this.breadcrumbService.addBreadcrumb(breadcrumb);

                this.footer = new Footer({
                    updated: this.page.updated,
                    sourceFlag: true,
                    breadcrumbs: [
                        markdownBreadcrumb,
                        new Breadcrumb({
                            title: 'Edit',
                            url: `/admin/pages/page/${this.page.id}/change/`,
                            linkFlag: true,
                        })
                    ],
                });

                if (this.page.contentType == 'markdown')
                    this.childBreadcrumbs = this.page.children;
                else
                    this.childBreadcrumbs = [];
            })
            .catch(error => this.error = error);
    }

    onToggleSource(showSource: boolean) {
        this.showSource = showSource;
    }
}
