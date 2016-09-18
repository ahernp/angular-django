import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PageDetailComponent} from './pages/page-detail.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomepageComponent} from './homepage/homepage.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'page/:slug',
        component: PageDetailComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
