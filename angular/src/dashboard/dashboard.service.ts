import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Dashboard} from './dashboard';

import appSettings = require('../app.settings');
import {dashboardUrl} from "./dashboard.component";


@Injectable()
export class DashboardService {

    constructor(private http:Http) {
    }

    getDashboard() {
        return this.http.get(`${appSettings.apiEndpoint}${dashboardUrl}/`)
            .toPromise()
            .then(response => response.json() as Dashboard)
            .catch(this.handleError);
    }

    private handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
