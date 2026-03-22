import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard-guard';
import { Dashboard } from './features/dashboard/dashboard';
import { Settings } from './features/settings/settings';
import { Users } from './features/users/users';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },

  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      { path: 'users', loadComponent: () => import('./features/users/users').then((m) => m.Users) },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
      },
      {
        path: 'activities',
        loadComponent: () =>
          import('./features/activity-log/activity-log').then((m) => m.ActivityLog),
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
