import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard.component';

import {PageService} from './page.service';

@Component({
    selector: 'ad-app',
    template: `
        <h1>{{title}}</h1>
            <nav>
                <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
                <a [routerLink]="['/pages']">Pages</a>
            </nav>
        <router-outlet></router-outlet>
        `,
    directives: [ROUTER_DIRECTIVES],
    precompile: [
        PagesComponent,
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