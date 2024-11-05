import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';
import { map, switchMap, tap } from 'rxjs';
import { AccountService } from '../../../shared/services/account.service';
import { Account } from '../../../shared/interfaces/account.interface';

const PRIMENG = [
  ButtonModule,
  DropdownModule,
  InputTextModule,
  InputGroupModule,
  InputGroupAddonModule
];

@Component({
  selector: 'app-switch-account',
  standalone: true,
  imports: [
    ...PRIMENG,
    ReactiveFormsModule
  ],
  templateUrl: './switch-account.component.html',
  styles: ``
})
export default class SwitchAccountComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private accountService = inject(AccountService);

  public user?: User;
  public userAccounts: Account[] = [];
  public emailControl: FormControl = this.formBuilder.control('', [Validators.required]);
  public accountControl: FormControl = this.formBuilder.control('', [Validators.required]);

  public searchUser(): void {
    if (this.emailControl.valid) {
      this.authService.getUserByEmail(this.emailControl.value).pipe(
        switchMap((user) => {
          this.user = user;
          this.emailControl.disable();
          return this.accountService.getAccountsByUserId(user.id)
        })
      ).subscribe(accounts => {
        if (accounts.length === 0) {
          this.toastService.showError('No hay cuentas asociadas.')
        } else {
          this.userAccounts = accounts;
        }
      });
    } else {
      this.toastService.showError('Es necesario el email.');
    }
  }

  public onCancel(): void {
    this.user = undefined;
    this.emailControl.reset();
    this.emailControl.enable();
  }

  public switchAccount(): void {
    if (this.accountControl.valid) {
      const user_id: string = this.user!.id;
      const account_id: string = this.accountControl.value;
      this.accountService.switchAccount(user_id, account_id).subscribe({
        next: () => {
          this.user = undefined;
          this.emailControl.reset();
          this.emailControl.enable();
          this.toastService.showSuccess('Cambio realizado con exito.');
        },
        error: () => this.toastService.showError('No es posible elegir la misma cuenta.')
      });
    } else {
      this.toastService.showError('Elije una cuenta.')
    }
  }

}
