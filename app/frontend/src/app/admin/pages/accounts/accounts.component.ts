import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../../../shared/interfaces/account.interface';

import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    SelectButtonModule
  ],
  templateUrl: './accounts.component.html',
  styles: ``
})
export default class AccountsComponent implements OnInit {

  private activatedRouted = inject(ActivatedRoute);

  public accounts: Account[] = [];
  public showAccounts: Account[] = [];

  public options: { label: string, value: string }[] = [
    {
      label: 'Todos',
      value: 'all'
    },
    {
      label: 'Congeladas',
      value: 'frozen'
    },
    {
      label: 'Cerradas',
      value: 'closed'
    },
    {
      label: 'Activas',
      value: 'active'
    }
  ];

  ngOnInit(): void {
    this.activatedRouted.data.subscribe(({ accounts }) => {
      this.accounts = accounts;
      this.showAccounts = accounts;
    });
  }

  public returnAccounts(event: SelectButtonChangeEvent): void {
    if (event.value === 'all') {
      this.showAccounts = this.accounts
    } else {
      this.showAccounts = this.accounts.filter(account => account.state === event.value);
    }
  }

}
