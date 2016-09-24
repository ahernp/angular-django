import {Component, OnInit} from '@angular/core';

import {MarkdownPage} from '../markdown-pages/markdown-page';
import {MarkdownPageService} from '../markdown-pages/markdown-page.service';

import appSettings = require('../app.settings');
import {BreadcrumbService} from "../breadcrumbs/breadcrumb.service";
import {Breadcrumb} from "../breadcrumbs/breadcrumb";
import {rootTitle} from "../app.settings";

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
    error: any;

    constructor(
        private markdownPageService:MarkdownPageService,
        private breadcrumbService:BreadcrumbService) {
    }

    ngOnInit(): void {
        this.getHomepage();
    }

    getHomepage() {
        this.markdownPageService
            .getPage(homepageSlug)
            .then(page => {
                this.homepage = page;
                var breadcrumb = new Breadcrumb(homepageTitle, homepageUrl, page.updated, rootTitle);
                this.breadcrumbs = this.breadcrumbService.addBreadcrumb(breadcrumb);
            })
            .catch(error => this.error = error);
    }
}
