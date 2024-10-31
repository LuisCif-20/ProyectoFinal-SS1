import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces/auth.interface';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shared-auth-button',
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    TooltipModule
  ],
  templateUrl: './auth-button.component.html',
  styles: ``
})
export class AuthButtonComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  private sub?: Subscription;

  public isAuth: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.sub = this.authService.authStatus$.subscribe(status => {
      this.isAuth = status === AuthStatus.Authenticated;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public throwAction(): void {
    if (this.isAuth) {
      this.authService.logout().subscribe({
        next: () => {
          this.toastService.showSuccess('Regresa pronto.')
          this.router.navigateByUrl('/home');
        },
        error: () => this.toastService.showError('Error interno del servidor')
      });
    } else {
      this.router.navigateByUrl('/auth');
    }
  }

}
