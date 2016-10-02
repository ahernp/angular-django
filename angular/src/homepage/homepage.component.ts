import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {MarkdownPage} from '../markdown-pages/markdown-page';
import {MarkdownPageService} from '../markdown-pages/markdown-page.service';

import {BreadcrumbService} from "../breadcrumbs/breadcrumb.service";
import {Breadcrumb} from "../breadcrumbs/breadcrumb";
import {rootTitle} from "../app.settings";
import {Footer} from "../footer/footer";

export const homepageTitle: string = 'ahernp.com';
export const homepageUrl: string = '/';

const homepageSlug: string = 'ahernp-com';

@Component({
    moduleId: module.id,
    selector: 'ad-page',
    templateUrl: './homepage.component.html',
    providers: []
})


export class HomepageComponent implements OnInit {
    homepage: MarkdownPage;
    breadcrumbs: Breadcrumb[];
    footer: Footer;
    showSource: boolean = false;
    error: any;

    constructor(
        private markdownPageService:MarkdownPageService,
        private breadcrumbService:BreadcrumbService,
        private titleService:Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle(homepageTitle);
        this.getHomepage();
    }

    getHomepage() {
        this.markdownPageService
            .getPage(homepageSlug)
            .then(page => {
                this.homepage = page;

                var breadcrumb = new Breadcrumb({
                    title: homepageTitle,
                    url: homepageUrl,
                    updated: this.homepage.updated,
                    parentName: rootTitle});
                this.breadcrumbs = this.breadcrumbService.addBreadcrumb(breadcrumb);

                this.footer = new Footer({
                    updated: this.homepage.updated,
                    sourceFlag: true,
                    markdownFlag: true,
                    adminUrl: `/admin/pages/page/${this.homepage.id}/change/`,
                });

            })
            .catch(error => this.error = error);
    }

    onToggleSource(showSource: boolean) {
        this.showSource = showSource;
    }
}
