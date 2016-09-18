import {provideRouter, RouterConfig}  from '@angular/router';

import {PageDetailComponent} from './pages/page-detail.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomepageComponent} from './homepage/homepage.component';

const routes: RouterConfig = [
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

export const appRouterProviders = [
  provideRouter(routes)
];
