import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'

import {Page} from '../pages/page';
import {PageService} from '../pages/page.service';

import appSettings = require('../app.settings');

@Component({
    moduleId: module.id,
    selector: 'ad-page',
    templateUrl: './homepage.component.html',
    providers: []
})


export class HomepageComponent implements OnInit {
    homepage: Page;
    error: any;

    constructor(
        private pageService:PageService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getHomepage();
    }

    getHomepage() {
        this.pageService
            .getPage(appSettings.homepageSlug)
            .then(page => {
                this.homepage = page
            })
            .catch(error => this.error = error);
    }
}
