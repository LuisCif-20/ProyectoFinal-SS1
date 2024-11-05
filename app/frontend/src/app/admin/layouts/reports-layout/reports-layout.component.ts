import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-reports-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MenubarModule
  ],
  templateUrl: './reports-layout.component.html',
  styles: ``
})
export class ReportsLayoutComponent {

  public menuItems: MenuItem[] = [
    {
      label: 'Cuentas Congeladas',
      icon: 'pi pi-hourglass',
      routerLink: '/admin/reports/frozen'
    },
    {
      label: 'Movimientos',
      icon: 'pi pi-sort-alt',
      routerLink: '/admin/reports/transactions'
    },
    {
      label: 'Detalle de Cuenta',
      icon: 'pi pi-ellipsis-h',
      routerLink: '/admin/reports/account'
    },
    {
      label: 'Cuentas',
      icon: 'pi pi-address-book',
      routerLink: '/admin/reports/accounts'
    },
    {
      label: 'Cierre',
      icon: 'pi pi-times-circle',
      routerLink: '/admin/reports/closed'
    }
  ];

}
