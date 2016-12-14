import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {PageService} from '../pages/page.service';
import {Page} from "../pages/page";

import {Footer} from "../core/footer/footer";

import {blogRootTitle, blogUrl} from "../app.settings";
import {toDateTimeString} from "../utilities";

const numberOfBlogPages: number = 3;
const blogArchiveBreadcrumb = new Breadcrumb({title: 'Archive', url: '/sitemap/blog'});
export const blogFeedBreadcrumb = new Breadcrumb({title: 'RSS', url: '/blog/feed', externalLinkFlag: true});

@Component({
    selector: 'ad-blog',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <div *ngFor="let page of pages">
                <h2 class="published_date" *ngIf="page.published">
                    {{page.published|date:'d MMMM y'}}
                </h2>
                <h1>{{page.title}}</h1>
                <ad-markdown-content [content]="page.content"></ad-markdown-content>
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
    now: string;
    title: string = blogRootTitle;
    breadcrumbs: Breadcrumb[];
    pages: Page[];
    footer: Footer;

    constructor(
        private pageService: PageService,
        private breadcrumbService: BreadcrumbService,
        private titleService: Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle(blogRootTitle);
        this.now = toDateTimeString(new Date());
        this.populateHeader();
        this.populateFooter();
        this.getRecentBlogPages();
    }

    populateHeader() {
        var blogBreadcrumb = new Breadcrumb({
            title: blogRootTitle,
            url: blogUrl});
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(blogBreadcrumb);
    }

    populateFooter() {
        this.footer = new Footer({
            updated: this.now,
            breadcrumbs: [blogFeedBreadcrumb, blogArchiveBreadcrumb],
        });
    }

    populateRecentBlogPages(pages) {
        let blogPages = pages.filter(page => page.parentName == blogRootTitle);
        blogPages.sort((pageA: Page, pageB: Page): number => {
            if (pageA.published == pageB.published)
                return 0;
            else
                return (pageA.published > pageB.published) ? -1 : 1;
        });
        this.pages = blogPages.slice(0, numberOfBlogPages);
    }

    getRecentBlogPages() {
        this.pageService.getPages()
            .subscribe(pages => this.populateRecentBlogPages(pages));
    }
}
