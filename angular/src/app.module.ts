import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';

import {AppComponent} from './app.component';

import {appRouting} from "./app.routing";

import {CoreModule} from "./core/core.module";
import {FeedreaderModule} from "./feedreader/feedreader.module";
import {PagesModule} from "./pages/pages.module";
import {TimersModule} from "./timers/timers.module";
import {ToolsModule} from "./tools/tools.module";

import {BlogComponent} from "./blog/blog.component";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardService} from "./dashboard/dashboard.service";

import {SitemapComponent} from "./sitemap/sitemap.component";


@NgModule({
    imports: [
        appRouting,
        BrowserModule,
        CoreModule,
        FeedreaderModule,
        FormsModule,
        HttpModule,
        PagesModule,
        TimersModule,
        ToolsModule,
    ],
    declarations: [
        BlogComponent,
        AppComponent,
        DashboardComponent,
        SitemapComponent,
    ],
    providers: [
        DashboardService,
        {provide: XSRFStrategy, useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken')},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
