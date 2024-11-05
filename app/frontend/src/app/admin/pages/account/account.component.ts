import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Account } from '../../../shared/interfaces/account.interface';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../shared/services/toast.service';
import { AccountService } from '../../../shared/services/account.service';
import { CommonModule } from '@angular/common';

const PRIMENG = [
  ButtonModule,
  InputTextModule,
  InputGroupModule,
  InputTextareaModule,
  InputGroupAddonModule
];

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ...PRIMENG,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './account.component.html',
  styles: ``
})
export default class AccountComponent {

  private formBuilder = inject(FormBuilder);
  private toastService = inject(ToastService);
  private accountService = inject(AccountService);

  public account?: Account;
  public accountNcontrol: FormControl = this.formBuilder.control('', [
    Validators.required, 
    Validators.minLength(13), 
    Validators.maxLength(13),
    Validators.pattern(/^\d+$/)
  ]);

  public searchAccount(): void {
    if (this.accountNcontrol.valid) {
      this.accountService.getAccountByNumber(this.accountNcontrol.value).subscribe({
        next: (account) => this.account = account,
        error: () => this.toastService.showError('No existe la cuenta')
      });
    } else {
      this.toastService.showError('El campo es incorrecto.');
    }
  }

}
