import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {ReplaySubject} from "rxjs/ReplaySubject";

import {Dashboard} from './dashboard';

import {MessageService} from "../core/message/message.service";

import {SchedulerService} from "../core/scheduler/scheduler.service";

import {apiEndpoint, dashboardUrl} from "../app.settings";

import {feedreaderPollMinute} from "../feedreader/feedreader.service";

const messageSource: string = 'Dashboard';

@Injectable()
export class DashboardService {
    dashboardCache: Dashboard;
    dashboard$: ReplaySubject<any> = new ReplaySubject(1);

    constructor(
        private http: Http,
        private messageService: MessageService,
        private schedulerService: SchedulerService
    ) {
        this.dashboard$.next(new Dashboard());
        this.initialPopulateDashboard();
    }

    getDashboard(): ReplaySubject<any> {
        return this.dashboard$;
    }

    populateCache = (): void => {
        let url: string = `${apiEndpoint}${dashboardUrl}/`;
        this.http.get(url)
            .subscribe(
                response => {
                    this.dashboardCache = <Dashboard>response.json();
                    this.dashboard$.next(this.dashboardCache);
                },
                error => {
                    this.messageService.addErrorMessage(
                        messageSource,
                        `${messageSource} Error: Url ${url}; Status Code ${error.status}; ${error.statusText}`);
                    console.log(error);
                }
            );
    };

    initialPopulateDashboard(): void {
        this.populateCache();
        this.schedulerService.hourly(feedreaderPollMinute, this.populateCache);
    }
}
