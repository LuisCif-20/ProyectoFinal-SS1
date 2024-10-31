import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';


const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                title: 'Inicia Sesión',
                loadComponent: () => import('./pages/login-page/login-page.component'),
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    }
];

export default routes;