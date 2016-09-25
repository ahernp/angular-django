import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {MarkdownPageDetailComponent} from "./markdown-pages/markdown-page-detail.component";
import {MarkdownPageService} from "./markdown-pages/markdown-page.service";
import {routing} from "./app.routes";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header.component";
import {MarkdownContentComponent} from "./markdown-content.component";
import {MarkdownPageSourceComponent} from "./markdown-pages/markdown-page-source.component";
import {BreadcrumbService} from "./breadcrumbs/breadcrumb.service";
import {DashboardService} from "./dashboard/dashboard.service";
import {SitemapComponent} from "./sitemap/sitemap.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
    ],
    declarations: [
        AppComponent,
        MarkdownContentComponent,
        DashboardComponent,
        FooterComponent,
        HeaderComponent,
        HomepageComponent,
        MarkdownPageDetailComponent,
        MarkdownPageSourceComponent,
        SitemapComponent,
    ],
    providers: [
        MarkdownPageService,
        BreadcrumbService,
        DashboardService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
