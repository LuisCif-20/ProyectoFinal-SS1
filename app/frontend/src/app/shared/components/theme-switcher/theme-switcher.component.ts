import { Component, computed, inject, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'shared-theme-switcher',
  standalone: true,
  imports: [
    ButtonModule,
    TooltipModule
  ],
  templateUrl: './theme-switcher.component.html',
  styles: ``
})
export class ThemeSwitcherComponent {

  private themeService = inject(ThemeService);

  public themeIcon = computed(() => this.themeService.themeIcon());

  public themeToolTip = computed(() => this.themeService.themeToolTip());

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }

}
