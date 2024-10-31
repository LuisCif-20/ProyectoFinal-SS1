import { Component, inject, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';

import { ThemeSwitcherComponent } from "../theme-switcher/theme-switcher.component";
import { AuthButtonComponent } from "../auth-button/auth-button.component";
import { SideBarComponent } from "../side-bar/side-bar.component";
import { Router } from '@angular/router';

const PRIMENG = [
  ToastModule,
  MenubarModule,
];

@Component({
  selector: 'shared-tool-bar',
  standalone: true,
  imports: [
    ...PRIMENG,
    ThemeSwitcherComponent,
    AuthButtonComponent,
    SideBarComponent
  ],
  templateUrl: './tool-bar.component.html',
  styles: ``,
})
export class ToolBarComponent {

  public items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: '/home'
    },
    {
      label: 'Información',
      icon: 'pi pi-info-circle',
      routerLink: '/info'
    }
  ];

}
