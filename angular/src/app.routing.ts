import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BlogComponent} from "./blog/blog.component";
import {DashboardComponent} from './dashboard/dashboard.component';
import {FeedreaderComponent} from "./feedreader/feedreader.component";
import {PageComponent} from './pages/page.component';
import {SitemapComponent} from "./sitemap/sitemap.component";
import {ToolsComponent} from "./tools/tools.component";
import {TimersComponent} from "./timers/timers.component";

const appRoutes: Routes = [
    {
        path: '',
        component: PageComponent
    },
    {
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'feedreader',
        component: FeedreaderComponent
    },
    {
        path: 'page/:slug',
        component: PageComponent
    },
    {
        path: 'sitemap',
        component: SitemapComponent
    },
    {
        path: 'sitemap/:slug',
        component: SitemapComponent
    },
    {
        path: 'timers',
        component: TimersComponent
    },
    {
        path: 'tools',
        component: ToolsComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
