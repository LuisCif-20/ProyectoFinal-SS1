import { Routes } from '@angular/router';
import { authRoutesGuard } from './auth/guards/auth-routes.guard';
import { authGuard } from './auth/guards/auth.guard';
import { roleGuard } from './auth/guards/role.guard';
import { accountTypesResolver } from './shared/resolvers/account-types.resolver';
import { exchangeRatesResolver } from './shared/resolvers/exchange-rates.resolver';

export const routes: Routes = [
    {
        path: 'admin',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['ADMIN'] },
        loadChildren: () => import('./admin/admin.routes')
    },
    {
        path: 'client',
        canActivate: [authGuard, roleGuard],
        data: { roles: ['CLIENT'] },
        loadChildren: () => import('./client/client.routes')
    },
    {
        path: 'auth',
        canActivate: [authRoutesGuard],
        loadChildren: () => import('./auth/auth.routes')
    },
    {
        path: 'home',
        loadComponent: () => import('./shared/pages/home-page/home-page.component')
    },
    {
        path: 'info',
        loadComponent: () => import('./shared/pages/info-page/info-page.component'),
        resolve: {
            accountTypes: accountTypesResolver,
            exchangeRates: exchangeRatesResolver
        }
    },
    {
        path: '404',
        loadComponent: () => import('./shared/pages/error404-page/error404-page.component')
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: '**',
        redirectTo: '404'
    }
];
