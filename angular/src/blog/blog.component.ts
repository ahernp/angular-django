import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {PageService} from '../pages/page.service';
import {Page} from "../pages/page";

import {Footer} from "../core/footer/footer";

export const blogRootTitle: string = 'Blog';
const numberOfRecentBlogPages: number = 3;

export const blogBreadcrumb: Breadcrumb = <Breadcrumb>
    {title: 'Blog', url: '/blog', parentName: 'ahernp.com'};
export const blogRSSBreadcrumb: Breadcrumb = <Breadcrumb>
    {title: 'RSS', url: '/blog/feed', externalLinkFlag: true};
export const blogArchiveBreadcrumb: Breadcrumb = <Breadcrumb>
    {title: 'Archive', url: '/sitemap/blog', parentName: 'ahernp.com'};

@Component({
    selector: 'ad-blog',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <div *ngFor="let page of pages" class="entry">
                <div style="width: 100%">
                    <h1 style="display:inline;">{{page.title}}</h1>
                    <h2 *ngIf="page.published" class="published" style="display:inline;">Published: {{page.published}}</h2>
                </div>
                <ad-markdown-content [content]="page.content"></ad-markdown-content>
                <p class="entry-meta">
                    Last Updated: {{page.updated}};
                    <a routerLink="{{page.url}}">{{page.title}}</a>.
                </p>
            </div>
        </div>
        <ad-footer id="footer" *ngIf="footer" [footer]="footer"></ad-footer>
        `,
    styles: [`
        div.entry {
            border: 1px #046 solid;
            border-radius: 10px;
            margin: 5px 0;
            padding: 5px;
        }
        p.entry-meta {
            border-top: 1px #ccc solid;
            margin: 16px 0;
            padding-top: 16px;
        }
    `],
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

    populateHeader(): void {
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(blogBreadcrumb);
    }

    populateFooter(): void {
        this.footer = <Footer>{breadcrumbs: [blogArchiveBreadcrumb, blogRSSBreadcrumb]};
    }

    populateRecentBlogPages(pages: Page[]): void {
        let blogPages: Page[] = pages.filter(page => page.parentName == blogRootTitle);
        blogPages.sort((pageA: Page, pageB: Page): number => {
            if (pageA.published == pageB.published)
                return 0;
            else
                return (pageA.published > pageB.published) ? -1 : 1;
        });
        this.pages = blogPages.slice(0, numberOfRecentBlogPages);
    }

    getRecentBlogPages(): void {
        this.pageService.getPages()
            .subscribe(pages => this.populateRecentBlogPages(pages));
    }
}
