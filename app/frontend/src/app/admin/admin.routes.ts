import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { accountTypesResolver } from '../shared/resolvers/account-types.resolver';
import { exchangeRatesResolver } from '../shared/resolvers/exchange-rates.resolver';

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
                resolve: {
                    exchangeRates: exchangeRatesResolver
                },
                loadComponent: () => import('./pages/exchange-rate-page/exchange-rate-page.component')
            },
            {
                path: 'funds',
                loadComponent: () => import('./pages/funds-page/funds-page.component')
            },
            {
                path: 'create-account',
                resolve: {
                    accountTypes: accountTypesResolver
                },
                loadComponent: () => import('./pages/create-account-page/create-account-page.component')
            },
            {
                path: 'change-account',
                resolve: {
                    accountTypes: accountTypesResolver
                },
                loadComponent: () => import('./pages/change-account-page/change-account-page.component')
            },
            {
                path: 'switch-account',
                loadComponent: () => import('./pages/switch-account/switch-account.component')
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