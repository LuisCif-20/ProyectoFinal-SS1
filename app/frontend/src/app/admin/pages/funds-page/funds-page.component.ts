import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { Account } from '../../../shared/interfaces/account.interface';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { ToastService } from '../../../shared/services/toast.service';
import { AccountService } from '../../../shared/services/account.service';
import { TransactionService } from '../../../shared/services/transaction.service';
import { HttpErrorResponse } from '@angular/common/http';

const PRIMENG = [
  ButtonModule,
  InputTextModule,
  InputGroupModule,
  InputNumberModule,
  SelectButtonModule,
  InputGroupAddonModule
];

@Component({
  selector: 'app-funds-page',
  standalone: true,
  imports: [
    ...PRIMENG,
    ReactiveFormsModule
  ],
  templateUrl: './funds-page.component.html',
  styles: ``
})
export default class FundsPageComponent {

  private formBuilder = inject(FormBuilder);
  private toastService = inject(ToastService);
  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);

  public account?: Account;
  public amountControl: FormControl = this.formBuilder.control(0, [Validators.required, Validators.min(0.01)]);
  public typeControl: FormControl = this.formBuilder.control('debit', [Validators.required]);
  public accountNcontrol: FormControl = this.formBuilder.control('', [
    Validators.required, 
    Validators.minLength(13), 
    Validators.maxLength(13),
    Validators.pattern(/^\d+$/)
  ]);
  public options: { label: string, value: string }[] = [
    {
      label: 'Debito',
      value: 'debit'
    },
    {
      label: 'Credito',
      value: 'credit'
    }
  ];

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

  public makeTransaction(): void {
    if (this.amountControl.valid) {
      const account_id: string = this.account!.id;
      const amount: number = this.amountControl.value;
      const type: string = this.typeControl.value;
      this.transactionService.makeTransaction(account_id, amount, type).subscribe({
        next: () => {
          this.account = undefined;
          this.accountNcontrol.enable();
          this.accountNcontrol.reset();
          this.amountControl.reset();
          this.toastService.showSuccess('Transaccion realizada con exito.');
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400 && this.typeControl.value === 'debit') {
            this.toastService.showError('Fondos insuficientes.');
          }
        }
      });
    } else {
      this.toastService.showError('El monto no es correcto.');
    }
  }

}
