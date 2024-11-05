import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../shared/services/toast.service';
import { AccountService } from '../../../shared/services/account.service';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../../shared/interfaces/transaction.interface';
import { TransactionService } from '../../../shared/services/transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './transactions.component.html',
  styles: ``
})
export default class TransactionsComponent {

  private formBuilder = inject(FormBuilder);
  private toastService = inject(ToastService);
  private transactionService = inject(TransactionService);

  public dateControl: FormControl = this.formBuilder.control('', [Validators.required]);
  public transactions: Transaction[] = [];

  public searchTrans(): void {
    if (this.dateControl.valid) {
      const [ startDate, endDate ] = this.dateControl.value;
      this.transactionService.getTransactionsByDate(startDate, endDate).subscribe({
        next: (transactions) => this.transactions = transactions
      });
    } else {
      this.toastService.showError('Ingresa un rango correcto');
    }
  }

}
