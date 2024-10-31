import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../shared/services/toast.service';
import { LoginBody } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

const PRIMENG = [
  ButtonModule,
  InputTextModule,
  InputGroupModule,
  InputGroupAddonModule
];

@Component({
  standalone: true,
  imports: [
    ...PRIMENG,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styles: `
    .p-card.p-card-body{
      width: 100%;
      height: 100%;
    }
  `
})
export default class LoginPageComponent {

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    pin: ['', [Validators.required]]
  }); 

  constructor() { }

  private makeLoginBody(): LoginBody {
    const body = this.loginForm.value;
    return body;
  }

  public onLogin(): void {
    if (this.loginForm.invalid) {
      this.toastService.showError('Formulario mal llenado.')
    } else {
      this.authService.login(this.makeLoginBody()).pipe(
        switchMap(() => this.authService.getUserInfo())
      ).subscribe({
        next: (user) => {
          this.toastService.showSuccess('Bienvenido');
          if (user.role.name === 'ADMIN') {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/client');
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.toastService.showError('Correo invalido.');
          } else if (error.status === 401) {
            this.toastService.showError('Pin incorrecto');
          } else {
            this.toastService.showError('Error interno del servidor.')
          }
        }
      });
    }
  }

  public rememberPin(): void {
    if (this.loginForm.get('email')?.valid) {
      this.authService.rememberPin(this.loginForm.get('email')?.value).subscribe({
        next: () => this.toastService.showSuccess('Correo enviado'),
        error: () => this.toastService.showError('Algo salio mal')
      });
    } else {
      this.toastService.showError('Correo necesario');
    }
  }

}
