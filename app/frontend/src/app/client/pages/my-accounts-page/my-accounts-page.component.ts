import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../../../shared/interfaces/account.interface';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'client-my-accounts-page',
  standalone: true,
  imports: [
    TitleCasePipe,
    CommonModule
  ],
  templateUrl: './my-accounts-page.component.html',
  styles: ``
})
export default class MyAccountsPageComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  public accounts: Account[] = [];

  constructor() { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accounts }) => {
      this.accounts = accounts;
      console.log(accounts);
    });
  }

}
