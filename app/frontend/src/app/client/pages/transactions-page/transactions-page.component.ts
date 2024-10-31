import { Component, inject, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../../../shared/interfaces/account.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TotalByType, Transaction } from '../../../shared/interfaces/transaction.interface';
import { TransactionService } from '../../../shared/services/transaction.service';
import { CommonModule } from '@angular/common';

const PRIMENG = [
  ButtonModule,
  DropdownModule,
  CalendarModule
];

@Component({
  selector: 'client-transactions-page',
  standalone: true,
  imports: [
    ...PRIMENG,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './transactions-page.component.html',
  styles: ``
})
export default class TransactionsPageComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private transactionService = inject(TransactionService);

  public accounts: Account[] = [];
  public form: FormGroup = this.formBuilder.group({
    account_id: ['', [Validators.required]],
    range_dates: ['', [Validators.required]]
  });

  public transactions: Transaction[] = [];
  public totalByType: TotalByType[] = [];

  constructor() { }

  private makebody(): { account_id: string; start_date: Date; end_date: Date } {
    const { account_id, range_dates } = this.form.value;
    const [ start_date, end_date ] = range_dates;
    return {
      account_id,
      start_date,
      end_date
    };
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accounts }) => {
      this.accounts = accounts;
    });
  }

  public searchTransactions(): void {
    if (this.form.valid) {
      this.transactionService.getTransactionsByAccountAndDate(this.makebody()).subscribe({
        next: ({ transactions, totalByType }) => {
          this.transactions = transactions;
          this.totalByType = totalByType;
          console.log(transactions, totalByType)
        }
      });
    }
  }

}
