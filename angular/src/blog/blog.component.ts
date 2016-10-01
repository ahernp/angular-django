import {Component, OnInit} from '@angular/core';

import {MarkdownPageService} from '../markdown-pages/markdown-page.service';
import {Breadcrumb} from "../breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../breadcrumbs/breadcrumb.service";

import {dashboardTitle, dashboardUrl} from "../dashboard/dashboard.component";
import {homepageTitle, homepageUrl} from "../homepage/homepage.component";
import {rootTitle, toDateTimeString} from "../app.settings";
import {Footer} from "../footer/footer";
import {MarkdownPage} from "../markdown-pages/markdown-page";

export const blogTitle: string = 'Blog';
export const blogUrl: string = '/blog';

@Component({
    selector: 'ad-blog',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <div *ngFor="let page of pages">
                <h2 class="published_date" *ngIf="page.published">
                    {{page.published|date:'d MMMM y'}}
                </h2>
                <ad-markdown-content [page]="page"></ad-markdown-content>
                <p class="blog_info">
                    Last Updated: {{page.updated}};
                    <a routerLink="{{page.url}}">{{page.title}}</a>.
                </p>
            </div>
        </div>
        <ad-footer id="footer" *ngIf="footer" [footer]="footer"></ad-footer>
        `,
    providers: []
})


export class BlogComponent implements OnInit {
    title: string = blogTitle;
    breadcrumbs: Breadcrumb[];
    pages: MarkdownPage[];
    footer: Footer;
    error: any;

    constructor(
        private markdownPageService:MarkdownPageService,
        private breadcrumbService:BreadcrumbService) {
    }

    ngOnInit(): void {
        this.populateHeader();
        this.populateFooter();
        this.getBlogPages();
    }

    populateHeader() {
        var dashboardBreadcrumb = new Breadcrumb({
            title: blogTitle,
            url: blogUrl});
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(dashboardBreadcrumb);
    }

    populateFooter() {
        this.footer = new Footer({
            adminUrl: `/admin/`,
        });
    }


    getBlogPages() {
        this.markdownPageService
            .getChildPages('blog')
            .then(blogPages => {
                this.pages = blogPages;
            })
            .catch(error => this.error = error);
    }
}
