import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';

import {PageDetailComponent} from './pages/page-detail.component';
import {DashboardComponent} from './dashboard/dashboard.component';

import {PageService} from './pages/page.service';
import {HomepageComponent} from "./homepage/homepage.component";

@Component({
    selector: 'ad-app',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    precompile: [
        PageDetailComponent,
        HomepageComponent,
        DashboardComponent
    ],
    providers: [
        PageService,
        HTTP_PROVIDERS
    ]
})
export class AppComponent {
    title = 'Angular Django';
}
