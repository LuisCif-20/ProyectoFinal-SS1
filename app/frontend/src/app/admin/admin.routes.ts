import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'reports',
                loadComponent: () => import('./pages/reports-page/reports-page.component')
            }, 
            {
                path: 'add-user',
                loadComponent: () => import('./pages/add-user-page/add-user-page.component')
            },
            {
                path: 'exchange-rate',
                loadComponent: () => import('./pages/exchange-rate-page/exchange-rate-page.component')
            },
            {
                path: 'funds',
                loadComponent: () => import('./pages/funds-page/funds-page.component')
            },
            {
                path: 'create-account',
                loadComponent: () => import('./pages/create-account-page/create-account-page.component')
            },
            {
                path: 'change-account',
                loadComponent: () => import('./pages/change-account-page/change-account-page.component')
            },
            {
                path: 'close-account',
                loadComponent: () => import('./pages/close-account-page/close-account-page.component')
            },
            {
                path: '**',
                redirectTo: 'reports'
            }
        ]
    }
];

export default routes;