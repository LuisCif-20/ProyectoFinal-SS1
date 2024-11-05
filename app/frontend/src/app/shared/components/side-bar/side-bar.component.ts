import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces/auth.interface';
import { map, Observable, of, Subscription } from 'rxjs';
import { MenuComponent } from "../menu/menu.component";
import { MenuItem } from 'primeng/api';
import { AsyncPipe } from '@angular/common';

const PRIMENG = [
  ButtonModule,
  MenubarModule,
  SidebarModule
];

@Component({
  selector: 'shared-side-bar',
  standalone: true,
  imports: [
    ...PRIMENG,
    MenuComponent,
    AsyncPipe
],
  templateUrl: './side-bar.component.html',
  styles: ``
})
export class SideBarComponent implements OnInit, OnDestroy{

  private authService = inject(AuthService);
  private sub?: Subscription;

  public isAuthenticated: boolean = false;
  public sidebarVisible: boolean = false;
  public menuItems$: Observable<MenuItem[]> = this.authService.user$.pipe(
    map(user => {
      if (!user) {
        return [];
      } else {
        return this.returnMenuItems(user.role.name);
      }
    })
  );

  constructor() { }

  ngOnInit(): void {
    this.sub = this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status === AuthStatus.Authenticated;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public returnMenuItems(role: string): MenuItem[] {
    if (role === 'ADMIN') {
      return [
        {
          icon: 'pi pi-chart-bar',
          label: 'Reportes',
          routerLink: '/admin/reports'
        },
        {
          icon: 'pi pi-user-plus',
          label: 'Agregar Usuario',
          routerLink: '/admin/add-user'
        },
        {
          icon: 'pi pi-wallet',
          label: 'Crear Cuenta',
          routerLink: '/admin/create-account'
        },
        {
          icon: 'pi pi-money-bill',
          label: 'Tipos de Cambio',
          routerLink: '/admin/exchange-rate'
        },
        {
          icon: 'pi pi-sliders-h',
          label: 'Aumentar/Reducir Fondos',
          routerLink: '/admin/funds'
        },
        {
          icon: 'pi pi-arrow-right-arrow-left',
          label: 'Cambiar de Cuenta',
          routerLink: '/admin/change-account'
        },
        {
          icon: 'pi pi-history',
          label: 'Regresar a una Cuenta',
          routerLink: '/admin/switch-account'
        },
        {
          icon: 'pi pi-user-minus',
          label: 'Cerrar Cuenta',
          routerLink: '/admin/close-account'
        }
      ];
    } else {
      return [
        {
          icon: 'pi pi-users',
          label: 'Mis Cuentas',
          routerLink: '/client/my-accounts'
        },
        {
          icon: 'pi pi-sort-alt',
          label: 'Movimientos',
          routerLink: '/client/transactions'
        }
      ];
    }
  }

}
