import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {MarkdownPageService} from '../markdown-pages/markdown-page.service';
import {MarkdownPage} from "../markdown-pages/markdown-page";

import {Footer} from "../core/footer/footer";

const blogTitle: string = 'Blog (recent)';
const blogUrl: string = '/blog';

const blogArchiveBreadcrumb = new Breadcrumb({title: 'Archive', url: '/sitemap/blog'});
export const blogFeedBreadcrumb = new Breadcrumb({title: 'RSS', url: '/blog/feed', linkFlag: true});

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
        private breadcrumbService:BreadcrumbService,
        private titleService:Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle(blogTitle);
        this.populateHeader();
        this.populateFooter();
        this.getBlogPages();
    }

    populateHeader() {
        var blogBreadcrumb = new Breadcrumb({
            title: blogTitle,
            url: blogUrl});
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(blogBreadcrumb);
    }

    populateFooter() {
        this.footer = new Footer({
            breadcrumbs: [blogFeedBreadcrumb, blogArchiveBreadcrumb],
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
