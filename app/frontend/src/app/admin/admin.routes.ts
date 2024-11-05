import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { accountTypesResolver } from '../shared/resolvers/account-types.resolver';
import { exchangeRatesResolver } from '../shared/resolvers/exchange-rates.resolver';
import { ReportsLayoutComponent } from './layouts/reports-layout/reports-layout.component';
import { frozenResolver } from './resolvers/frozen.resolver';
import { accountsResolver } from './resolvers/accounts.resolver';


const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'reports',
                component: ReportsLayoutComponent,
                children: [
                    {
                        path: 'frozen',
                        resolve: {
                            frozen: frozenResolver
                        },
                        loadComponent: () => import('./pages/frozen-accounts/frozen-accounts.component')
                    },
                    {
                        path: 'closed',
                        loadComponent: () => import('./pages/closed-accounts/closed-accounts.component')
                    },
                    {
                        path: 'transactions',
                        loadComponent: () => import('./pages/transactions/transactions.component')
                    },
                    {
                        path: 'accounts',
                        resolve: {
                            accounts: accountsResolver
                        },
                        loadComponent: () => import('./pages/accounts/accounts.component')
                    },
                    {
                        path: 'account',
                        loadComponent: () => import('./pages/account/account.component')
                    },
                    {
                        path: '**',
                        redirectTo: 'frozen'
                    }
                ]
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