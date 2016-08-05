import { provideRouter, RouterConfig }  from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard.component';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
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