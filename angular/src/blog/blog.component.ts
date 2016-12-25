import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {PageService} from '../pages/page.service';
import {Page} from "../pages/page";

import {Footer} from "../core/footer/footer";

const blogRootTitle: string = 'Blog';
const blogUrl: string = '/blog';
const numberOfBlogPages: number = 3;

export const blogBreadcrumb = new Breadcrumb(
    {title: 'Blog', url: '/blog', parentName: 'ahernp.com'});
export const blogRSSBreadcrumb = new Breadcrumb(
    {title: 'RSS', url: '/blog/feed', externalLinkFlag: true});
export const blogArchiveBreadcrumb = new Breadcrumb(
    {title: 'Archive', url: '/sitemap/blog', parentName: 'ahernp.com'});

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
    styles: [`
        p.blog_info {
            border-top: 1px #ccc solid;
            margin: 16px 0;
            padding-top: 16px;
        }
    `],
    providers: []
})


export class BlogComponent implements OnInit {
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
        this.populateHeader();
        this.populateFooter();
        this.getRecentBlogPages();
    }

    populateHeader() {
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(blogBreadcrumb);
    }

    populateFooter() {
        this.footer = new Footer({
            breadcrumbs: [blogArchiveBreadcrumb, blogRSSBreadcrumb],
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
