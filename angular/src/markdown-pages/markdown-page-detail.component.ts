import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'
import {Title} from '@angular/platform-browser';

import {MarkdownPage} from './markdown-page';
import {MarkdownPageService} from './markdown-page.service';
import {Breadcrumb} from "../breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../breadcrumbs/breadcrumb.service";
import {Footer} from "../footer/footer";

@Component({
    selector: 'ad-page',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <h2 class="published_date" *ngIf="page && page.published">{{page.published|date:'d MMMM y'}}</h2>
            <ad-markdown-content *ngIf="page" [page]="page"></ad-markdown-content>
            <ad-page-source *ngIf="showSource" [page]="page"></ad-page-source>
        </div>
        <ad-footer id="footer" *ngIf="footer" [footer]="footer" (onToggleSource)="onToggleSource($event)"></ad-footer>
        `,
    providers: []
})


export class MarkdownPageDetailComponent implements OnInit {
    page: MarkdownPage;
    breadcrumbs: Breadcrumb[];
    footer: Footer;
    showSource: boolean = false;
    error: any;

    constructor(
        private markdownPageService:MarkdownPageService,
        private breadcrumbService:BreadcrumbService,
        private route: ActivatedRoute,
        private titleService:Title) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => this.getCurrentPage(params['slug']));
    }

    getCurrentPage(slug:string) {
        this.markdownPageService
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
                    markdownFlag: true,
                    adminUrl: `/admin/pages/page/${this.page.id}/change/`,
                });
            })
            .catch(error => this.error = error);
    }

    onToggleSource(showSource: boolean) {
        this.showSource = showSource;
    }
}
