import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {MarkdownPageDetailComponent} from "./markdown-pages/markdown-page-detail.component";
import {MarkdownPageService} from "./markdown-pages/markdown-page.service";
import {appRouting} from "./app.routing";
import {MarkdownPageSourceComponent} from "./markdown-pages/markdown-page-source.component";
import {BreadcrumbService} from "./core/breadcrumbs/breadcrumb.service";
import {DashboardService} from "./dashboard/dashboard.service";
import {SitemapComponent} from "./sitemap/sitemap.component";
import {MarkdownToHtmlPipe} from "./markdown-pages/markdown.pipe";
import {MarkdownContentComponent} from "./markdown-pages/markdown-content.component";
import {BlogComponent} from "./blog/blog.component";
import {HomepageNavigationComponent} from "./homepage/homepage-navigation.component";
import {ToolsModule} from "./tools/tools.module";
import {CoreModule} from "./core/core.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        appRouting,
        CoreModule,
        ToolsModule,
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HomepageComponent,
        MarkdownContentComponent,
        MarkdownPageDetailComponent,
        MarkdownPageSourceComponent,
        SitemapComponent,
        MarkdownToHtmlPipe,
        BlogComponent,
        HomepageNavigationComponent,
    ],
    providers: [
        MarkdownPageService,
        BreadcrumbService,
        DashboardService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
