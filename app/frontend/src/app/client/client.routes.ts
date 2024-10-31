import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { accountsResolver } from './resolvers/accounts.resolver';

const routes: Routes = [
    {
        path: '',
        component: ClientLayoutComponent,
        children: [
            {
                path: 'my-accounts',
                resolve: {
                    accounts: accountsResolver
                },
                loadComponent: () => import('./pages/my-accounts-page/my-accounts-page.component')
            },
            {
                path: 'transactions',
                resolve: {
                    accounts: accountsResolver
                },
                loadComponent: () => import('./pages/transactions-page/transactions-page.component')
            },
            {
                path: '**',
                redirectTo: 'my-accounts'
            }
        ]
    }
];

export default routes;