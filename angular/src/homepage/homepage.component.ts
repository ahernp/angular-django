import {Component, OnInit, Output} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {MarkdownPage} from '../markdown-pages/markdown-page';
import {MarkdownPageService} from '../markdown-pages/markdown-page.service';

import {BreadcrumbService} from "../breadcrumbs/breadcrumb.service";
import {Breadcrumb} from "../breadcrumbs/breadcrumb";
import {rootTitle, markdownBreadcrumb} from "../app.settings";
import {Footer} from "../footer/footer";

export const homepageUrl: string = '/';

const homepageSlug: string = 'ahernp-com';

@Component({
    moduleId: module.id,
    selector: 'ad-page',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        
        <div id="content">
            <h1 id="personal-website-of-paul-ahern">Personal Website of Paul Ahern</h1>
        
            <p>
                Here you will find a <a routerLink="/blog/" title="Blog">Blog</a>,
                some Application <a routerLink="/page/applications/" title="Application Guides">Guides</a>,
                a catalog for my <a routerLink="/page/library/" title="Library">Library</a>
                and a <a routerLink="/page/gallery/" title="Gallery">Gallery</a> of photographs.
            </p>
        
            <p>See <a routerLink="/page/rooska/" title="Rooska">Rooska</a> for maps and photographs of my mountain.</p>
        
            <div class="column-left">
                <ad-markdown-content *ngIf="homepage" [page]="homepage"></ad-markdown-content>
            </div>
        
            <div class="column-right">
                <ad-homepage-navigation></ad-homepage-navigation>
            </div>
        
            <div style="clear:both"></div>
        
            <ad-page-source *ngIf="showSource" [page]="homepage"></ad-page-source>
        
        </div>
        
        <ad-footer id="footer" *ngIf="footer" [footer]="footer" (onToggleSource)="onToggleSource($event)"></ad-footer>
    `,
    providers: []
})


export class HomepageComponent implements OnInit {
    @Output() footer: Footer;

    homepage: MarkdownPage;
    breadcrumbs: Breadcrumb[];
    showSource: boolean = false;
    error: any;

    constructor(
        private markdownPageService:MarkdownPageService,
        private breadcrumbService:BreadcrumbService,
        private titleService:Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle(rootTitle);
        this.getHomepage();
    }

    getHomepage() {
        this.markdownPageService
            .getPage(homepageSlug)
            .then(page => {
                this.homepage = page;

                var breadcrumb = new Breadcrumb({
                    title: rootTitle,
                    url: homepageUrl,
                    updated: this.homepage.updated,
                    parentName: rootTitle});
                this.breadcrumbs = this.breadcrumbService.addBreadcrumb(breadcrumb);

                this.footer = new Footer({
                    updated: this.homepage.updated,
                    sourceFlag: true,
                    breadcrumbs: [
                        markdownBreadcrumb,
                        new Breadcrumb({
                            title: 'Edit',
                            url: `/admin/pages/page/${this.homepage.id}/change/`,
                            linkFlag: true,
                        })
                    ],
                });

            })
            .catch(error => this.error = error);
    }

    onToggleSource(showSource: boolean) {
        this.showSource = showSource;
    }
}
