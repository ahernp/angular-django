import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Entry} from './feedreader';
import {FeedreaderService} from './feedreader.service';

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {Footer} from "../core/footer/footer";

import {rootTitle, adminBreadcrumb} from "../app.settings";
import {toDateTimeString} from "../utilities";

export const feedreaderTitle: string = 'Feedreader';
export const feedreaderUrl: string = '/feedreader';

@Component({
    selector: 'ad-feedreader',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div id="content">
            <h1>Feedreader</h1>
            <div *ngFor="let entry of entries" class="feed_entry">
                <h3 class="feed_entry_subtitle">From {{entry.feed}} on {{entry.published_time}}</h3>
                <p><a href="{{entry.link}}">{{entry.title}}</a></p>
                <p>{{entry.description}}</p>
            </div>
        </div>
        <ad-footer id="footer" *ngIf="footer" [footer]="footer"></ad-footer>
        <ad-spinner *ngIf="showSpinner"></ad-spinner>
        `,
    providers: []
})
export class FeedreaderComponent implements OnInit {
    now: string;
    entries: Entry[];
    breadcrumbs: Breadcrumb[];
    footer: Footer;
    showSpinner: Boolean = false;
    error: any;

    constructor(
        private feedreaderService: FeedreaderService,
        private breadcrumbService: BreadcrumbService,
        private titleService:Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle(feedreaderTitle);
        this.now = toDateTimeString(new Date());
        this.populateHeader();
        this.populateFooter();
        this.getEntries();
    }

    populateHeader() {
        var dashboardBreadcrumb = new Breadcrumb({
            title: feedreaderTitle,
            url: feedreaderUrl,
            updated: this.now,
            parentName: rootTitle});
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(dashboardBreadcrumb);
    }

    populateFooter() {
        this.footer = new Footer({
            updated: this.now,
            breadcrumbs: [adminBreadcrumb],
        });
    }

    getEntries() {
        this.showSpinner = true;
        this.feedreaderService
            .getEntries()
            .then(entries => {
                this.entries = entries;
                this.showSpinner = false;

            })
            .catch(error => this.error = error);
    }
}
