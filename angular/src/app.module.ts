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
import {HeaderComponent} from "./header/header.component";
import {MarkdownPageSourceComponent} from "./markdown-pages/markdown-page-source.component";
import {BreadcrumbService} from "./breadcrumbs/breadcrumb.service";
import {DashboardService} from "./dashboard/dashboard.service";
import {SitemapComponent} from "./sitemap/sitemap.component";
import {SpinnerComponent} from "./spinner/spinner.component";
import {MarkdownToHtmlPipe} from "./markdown-pages/markdown.pipe";
import {MarkdownContentComponent} from "./markdown-pages/markdown-content.component";
import {BlogComponent} from "./blog/blog.component";
import {HomepageNavigationComponent} from "./homepage/homepage-navigation.component";
import {ToolsComponent} from "./tools/tools.component";
import {CardgenComponent} from "./tools/cardgen.component";
import {CompareComponent} from "./tools/compare.component";
import {DeduplicateComponent} from "./tools/deduplicate.component";
import {MatchComponent} from "./tools/match.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        FooterComponent,
        HeaderComponent,
        HomepageComponent,
        MarkdownContentComponent,
        MarkdownPageDetailComponent,
        MarkdownPageSourceComponent,
        SitemapComponent,
        SpinnerComponent,
        MarkdownToHtmlPipe,
        BlogComponent,
        HomepageNavigationComponent,
        ToolsComponent,
        CardgenComponent,
        CompareComponent,
        DeduplicateComponent,
        MatchComponent,
    ],
    providers: [
        MarkdownPageService,
        BreadcrumbService,
        DashboardService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
