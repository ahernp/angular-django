import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Dashboard} from './dashboard';

import {dashboardUrl} from "./dashboard.component";
import {apiEndpoint} from "../app.settings";

@Injectable()
export class DashboardService {

    constructor(private http:Http) {
    }

    getDashboard() {
        return this.http.get(`${apiEndpoint}${dashboardUrl}/`)
            .map(response => response.json() as Dashboard);
    }
}
