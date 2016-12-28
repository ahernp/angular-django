import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {ReplaySubject} from "rxjs/ReplaySubject";

import {Dashboard} from './dashboard';

import {SchedulerService} from "../core/scheduler/scheduler.service";

import {apiEndpoint, dashboardUrl} from "../app.settings";

import {feedreaderPollMinute} from "../feedreader/feedreader.service";

@Injectable()
export class DashboardService {

    dashboardCache: Dashboard;
    dashboard$: ReplaySubject<any> = new ReplaySubject(1);

    constructor(
        private http: Http,
        private schedulerService: SchedulerService
    ) {
        this.dashboard$.next(new Dashboard());
        this.initialPopulateDashboard();
    }

    getDashboard(): ReplaySubject<any> {
        return this.dashboard$;
    }

    populateCache() {
        this.http.get(`${apiEndpoint}${dashboardUrl}/`)
            .subscribe(response => {
                this.dashboardCache = <Dashboard>response.json();
                this.dashboard$.next(this.dashboardCache);
            });
    }
    initialPopulateDashboard() {
        this.populateCache();
        var boundPopulateCache = this.populateCache.bind(this);
        this.schedulerService.hourly(feedreaderPollMinute, boundPopulateCache);
    }
}
