import { provideRouter, RouterConfig }  from '@angular/router';

import { PageDetailComponent } from './pages/page-detail.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './dashboard.component';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/page/ahernp-com',
    pathMatch: 'full'
  },
  {
    path: 'page/:slug',
    component: PageDetailComponent
  },
  {
    path: 'pages',
    component: PagesComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
