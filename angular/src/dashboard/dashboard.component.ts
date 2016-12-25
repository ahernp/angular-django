import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {Dashboard} from './dashboard';
import {DashboardService} from './dashboard.service';

import {PageService} from "../pages/page.service";

import {Breadcrumb} from "../core/breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../core/breadcrumbs/breadcrumb.service";

import {FeedreaderService} from "../feedreader/feedreader.service";

import {Footer} from "../core/footer/footer";

import {adminBreadcrumb, dashboardBreadcrumb, dashboardTitle} from "../app.settings";

@Component({
    selector: 'ad-dashboard',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div *ngIf="dashboard"id="content">
            <h1>Status <span style="font-size: small;">at {{dashboard.timeChecked}}</span></h1>
            <div style="width: 47%; float: left; padding-bottom: 1em; word-wrap: break-word;">
                <p *ngIf="dashboard.hostname"><strong>Hostname:</strong> {{dashboard.hostname}}</p>
                <h2>Cache</h2>
                <table>
                    <thead><tr><th>Type</th><th>Size</th></tr></thead>
                    <tbody>
                        <tr *ngIf="numberOfPages"><td>Database Pages</td><td>{{numberOfPages}}</td></tr>
                        <tr *ngIf="numberOfDynamicPages"><td>Dynamic Pages</td><td>{{numberOfDynamicPages}}</td></tr>
                        <tr *ngIf="numberOfEntries"><td>Feedreader Entries</td><td>{{numberOfEntries}}</td></tr>
                        <tr *ngIf="numberOfUnreadEntries"><td>Unread Entries</td><td>{{numberOfUnreadEntries}}</td></tr>
                    </tbody>
                </table>
                <h2>Settings Flags</h2>
                <span *ngFor="let flag of dashboard.settingsFlags"
                    [class.highlight]="flag.actual != flag.expected">
                        {{flag.name}}: {{flag.actual}}&ensp;
                </span>
                <h2>Version Information</h2>
                <p *ngIf="dashboard.gitVersion"><strong>Most Recent Commit:</strong> {{dashboard.gitVersion}}</p>
                <p *ngIf="dashboard.pythonPackages"><strong>Python Packages:</strong> {{dashboard.pythonPackages}}</p>
                <p *ngIf="dashboard.npmPackages"><strong>NPM Packages:</strong> {{dashboard.npmPackages}}</p>
            </div>
            <div style="width:47%; float:left; padding-left: 1em;">
                <h2>Recent Log Entries</h2>
                <p *ngFor="let entry of dashboard.logEntries">
                    <span [class.highlight]="entry.level == 'ERROR'">
                        {{entry.level}}: {{entry.msg}}<br>Logged {{entry.datetime}}
                    </span>
                </p>
            </div>
            <div style="clear:both"></div>
        </div>
        <ad-footer id="footer" *ngIf="footer" [footer]="footer" (onRefresh)="onRefresh()"></ad-footer>
        <ad-spinner *ngIf="showSpinner"></ad-spinner>
        `,
    providers: []
})
export class DashboardComponent implements OnInit {
    dashboard: Dashboard;
    numberOfPages: number;
    numberOfDynamicPages: number;
    numberOfEntries: number;
    numberOfUnreadEntries: number;
    breadcrumbs: Breadcrumb[];
    footer: Footer;
    showSpinner: Boolean = false;

    constructor(
        private dashboardService: DashboardService,
        private breadcrumbService: BreadcrumbService,
        private pageService: PageService,
        private feedreaderService: FeedreaderService,
        private titleService: Title) {
    }

    ngOnInit(): void {
        this.titleService.setTitle(dashboardTitle);
        this.populateHeader();
        this.populateFooter();
        this.getDashboard();
        this.getCaches();
    }

    populateHeader() {
        this.breadcrumbs = this.breadcrumbService.addBreadcrumb(dashboardBreadcrumb);
    }

    populateFooter() {
        this.footer = new Footer({
            breadcrumbs: [adminBreadcrumb],
            refreshFlag: true,
        });
    }

    getDashboard() {
        this.showSpinner = true;
        this.dashboardService
            .getDashboard()
            .subscribe(dashboard => {
                this.dashboard = dashboard;
                this.showSpinner = false;
            });
    }

    getCaches() {
        this.pageService.getPages()
            .subscribe(pages => this.numberOfPages = pages.length);
        this.numberOfDynamicPages = this.pageService.getDynamicPageBreadcrumbs().length;
        this.feedreaderService.getEntries()
            .subscribe(entries => {
                this.numberOfEntries = entries.length;
                this.numberOfUnreadEntries = entries.filter(entry => !entry.readFlag).length;
            })
    }

    onRefresh() {
        this.showSpinner = true;
        this.dashboardService.populateDashboard();
    }
}
