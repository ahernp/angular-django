import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BlogComponent} from "./blog/blog.component";
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomepageComponent} from './homepage/homepage.component';
import {PageComponent} from './pages/page.component';
import {SitemapComponent} from "./sitemap/sitemap.component";
import {ToolsComponent} from "./tools/tools.component";
import {TimersComponent} from "./timers/timers.component";

const appRoutes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'page/:slug',
        component: PageComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
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
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'tools',
        component: ToolsComponent
    },
    {
        path: 'timers',
        component: TimersComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
