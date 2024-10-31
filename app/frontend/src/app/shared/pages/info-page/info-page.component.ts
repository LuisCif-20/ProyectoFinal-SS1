import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountType, ExchangeRate } from '../../interfaces/account.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './info-page.component.html',
  styles: ``
})
export default class InfoPageComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  
  public accountTypes: AccountType[] = [];
  public exchangeRates: ExchangeRate[] = [];

  constructor() { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountTypes, exchangeRates }) => {
      this.accountTypes = accountTypes;
      this.exchangeRates = exchangeRates;
    });
  }

}
