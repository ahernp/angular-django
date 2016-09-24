import {Component, OnInit} from '@angular/core';

import {Dashboard} from './dashboard';
import {DashboardService} from './dashboard.service';
import {Breadcrumb} from "../breadcrumbs/breadcrumb";
import {BreadcrumbService} from "../breadcrumbs/breadcrumb.service";
import {rootTitle} from "../app.settings";

export const dashboardTitle: string = 'Dashboard';
export const dashboardUrl: string = '/dashboard';

@Component({
    selector: 'ad-dashboard',
    template: `
        <ad-header id="header" *ngIf="breadcrumbs" [breadcrumbs]="breadcrumbs"></ad-header>
        <div *ngIf="dashboard" id="content">
                <h1>Status <span style="font-size: small;">at {{dashboard.timeChecked}}</span></h1>
                <div style="width: 47%; float: left; padding-bottom: 1em; word-wrap: break-word;">
                    <p *ngIf="dashboard.hostname"><strong>Hostname:</strong> {{dashboard.hostname}}</p>
                    <h2>Settings Flags</h2>
                    <span *ngFor="let flag of dashboard.settings_flags"
                        [class.highlight]="flag.actual != flag.expected">
                            {{flag.name}}: {{flag.actual}}&ensp;
                    </span>
                    <h2>Version Information</h2>
                    <p *ngIf="dashboard.python_packages"><strong>Python Packages:</strong> {{dashboard.python_packages}}</p>
                    <p *ngIf="dashboard.npm_packages"><strong>NPM Packages:</strong> {{dashboard.npm_packages}}</p>
                    <div *ngIf="dashboard.gitversion">
                        <strong>Most Recent Commit:</strong><br>
                        <div style="padding-left:1em;">
                            <code>{{dashboard.gitversion}}</code>
                        </div>
                    </div>
                </div>
                <div style="width:47%; float:left; padding-left: 1em;">
                    <h2>Recent Log Entries</h2>
                </div>
            <div style="clear:both"></div>
        </div>
        <ad-footer id="footer" *ngIf="dashboard" [page]="dashboard"></ad-footer>
        `,
    providers: []
})

export class DashboardComponent implements OnInit {
    dashboard: Dashboard;
    breadcrumbs: Breadcrumb[];
    error: any;

    constructor(
        private dashboardService:DashboardService,
        private breadcrumbService:BreadcrumbService) {
    }

    ngOnInit(): void {
        this.getDashboard();
    }

    getDashboard() {
        this.dashboardService
            .getDashboard()
            .then(dashboard => {
                this.dashboard = dashboard;
                var dashboardBreadcrumb = new Breadcrumb(dashboardTitle, dashboardUrl, dashboard.timeChecked, rootTitle);
                this.breadcrumbs = this.breadcrumbService.addBreadcrumb(dashboardBreadcrumb);
            })
            .catch(error => this.error = error);
    }
}
