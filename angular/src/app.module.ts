import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {appRouting} from "./app.routing";

import {CoreModule} from "./core/core.module";
import {PagesModule} from "./pages/pages.module";
import {TimersModule} from "./timers/timers.module";
import {ToolsModule} from "./tools/tools.module";

import {BlogComponent} from "./blog/blog.component";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardService} from "./dashboard/dashboard.service";

import {HomepageComponent} from "./homepage/homepage.component";
import {HomepageNavigationComponent} from "./homepage/homepage-navigation.component";

import {SitemapComponent} from "./sitemap/sitemap.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        appRouting,
        CoreModule,
        PagesModule,
        TimersModule,
        ToolsModule,
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HomepageComponent,
        SitemapComponent,
        BlogComponent,
        HomepageNavigationComponent,
    ],
    providers: [
        DashboardService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
