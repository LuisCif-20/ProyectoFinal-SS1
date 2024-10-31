import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'shared-menu',
  standalone: true,
  imports: [
    CommonModule,
    RippleModule
  ],
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent {

  private router = inject(Router);

  @Input({ required: true }) public menuItems!: MenuItem[];

  public onClick(route: string): void {
    this.router.navigateByUrl(route);
  }

}
