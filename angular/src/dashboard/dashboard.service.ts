import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {ReplaySubject} from "rxjs/ReplaySubject";

import {Dashboard} from './dashboard';

import {dashboardUrl} from "./dashboard.component";
import {apiEndpoint} from "../app.settings";

@Injectable()
export class DashboardService {

    dashboardCache: Dashboard;
    dashboard$: ReplaySubject<any> = new ReplaySubject(1);

    constructor(private http:Http) {
        this.dashboard$.next(new Dashboard());
        this.populateDashboard();
    }

    getDashboard(): ReplaySubject<any> {
        return this.dashboard$;
    }

    populateDashboard() {
        this.http.get(`${apiEndpoint}${dashboardUrl}/`)
            .subscribe(response => {
                this.dashboardCache = response.json() as Dashboard;
                this.dashboard$.next(this.dashboardCache);
            });
    }
}
