import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'

import {Page} from '../pages/page';
import {PageService} from '../pages/page.service';

import appSettings = require('../app.settings');
import {BreadcrumbService} from "../breadcrumbs/breadcrumb.service";
import {Breadcrumb} from "../breadcrumbs/breadcrumb";

@Component({
    moduleId: module.id,
    selector: 'ad-page',
    templateUrl: './homepage.component.html',
    providers: []
})


export class HomepageComponent implements OnInit {
    homepage: Page;
    breadcrumbs: Breadcrumb[];
    error: any;

    constructor(
        private pageService:PageService,
        private breadcrumbService:BreadcrumbService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getHomepage();
    }

    getHomepage() {
        this.pageService
            .getPage(appSettings.homepageSlug)
            .then(page => {
                this.homepage = page;
                var breadcrumb = new Breadcrumb('ahernp.com', `/`);
                this.breadcrumbs = this.breadcrumbService.addBreadcrumb(breadcrumb);
            })
            .catch(error => this.error = error);
    }
}
