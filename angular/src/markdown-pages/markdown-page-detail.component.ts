import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'

import * as showdown from 'showdown';

import {MarkdownPage} from './markdown-page';
import {MarkdownPageService} from './markdown-page.service';
import {Breadcrumb} from "../breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../breadcrumbs/breadcrumb.service";

@Component({
    selector: 'ad-page',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <div [innerHTML]="html_content"></div>
            <!--<page-source [page]="page"></page-source>-->
        </div>
        <ad-footer id="footer" *ngIf="page" [page]="page"></ad-footer>
        `,
    providers: []
})


export class MarkdownPageDetailComponent implements OnInit {
    page: MarkdownPage;
    html_content: string;
    breadcrumbs: Breadcrumb[];
    error: any;

    constructor(
        private markdownPageService:MarkdownPageService,
        private breadcrumbService:BreadcrumbService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getCurrentPage(this.route.snapshot.params['slug']);
    }

    getCurrentPage(slug:string) {
        this.markdownPageService
            .getPage(slug)
            .then(page => {
                this.page = page;

                var breadcrumb = new Breadcrumb(
                    this.page.title,
                    this.page.url,
                    this.page.updated,
                    this.page.parentName);
                this.breadcrumbs = this.breadcrumbService.addBreadcrumb(breadcrumb);

                var converter = new showdown.Converter({'tables': true});
                this.html_content = converter.makeHtml(this.page.content);
            })
            .catch(error => this.error = error);
    }
}
