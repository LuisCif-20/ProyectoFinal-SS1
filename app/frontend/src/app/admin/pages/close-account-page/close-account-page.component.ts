import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { AccountService } from '../../../shared/services/account.service';
import { ToastService } from '../../../shared/services/toast.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../../shared/interfaces/account.interface';

const PRIMENG = [
  ButtonModule,
  InputTextModule,
  InputGroupModule,
  InputTextareaModule,
  InputGroupAddonModule
];

@Component({
  selector: 'admin-close-account-page',
  standalone: true,
  imports: [
    ...PRIMENG,
    ReactiveFormsModule
  ],
  templateUrl: './close-account-page.component.html',
  styles: ``
})
export default class CloseAccountPageComponent {

  private formBuilder = inject(FormBuilder);
  private toastService = inject(ToastService);
  private accountService = inject(AccountService);

  public account?: Account;
  public reasonControl: FormControl = this.formBuilder.control('', [Validators.required]);
  public accountNcontrol: FormControl = this.formBuilder.control('', [
    Validators.required, 
    Validators.minLength(13), 
    Validators.maxLength(13),
    Validators.pattern(/^\d+$/)
  ]);

  public searchAccount(): void {
    if (this.accountNcontrol.valid) {
      this.accountService.getAccountByNumber(this.accountNcontrol.value).subscribe({
        next: (account) => {
          if (!account.current_account) {
            this.toastService.showError('La cuenta esta deshabilitada.')
          } else {
            this.account = account;
            this.accountNcontrol.disable();
          }
        },
        error: () => this.toastService.showError('No existe la cuenta')
      });
    } else {
      this.toastService.showError('El campo es incorrecto.');
    }
  }

  public cancel(): void {
    this.account = undefined;
    this.accountNcontrol.enable();
    this.accountNcontrol.reset();
  }

  public closeAccount(): void  {
    if (this.reasonControl.valid) {
      const account_id: string = this.account!.id;
      const reason: string = this.reasonControl.value;
      this.accountService.closeAccount(account_id, reason).subscribe({
        next: () => {
          this.account = undefined;
          this.accountNcontrol.enable();
          this.accountNcontrol.reset();
          this.reasonControl.reset();
          this.toastService.showSuccess('Transaccion realizada con exito.');
        },
        error: () => this.toastService.showError('La cuenta no existe.')
      });
    } else {
      this.toastService.showError('La razon es necesaria');
    }
  }

}
