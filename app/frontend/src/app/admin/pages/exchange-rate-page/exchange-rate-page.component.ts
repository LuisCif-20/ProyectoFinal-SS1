import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExchangeRate } from '../../../shared/interfaces/account.interface';

import { ExchangeRateCardComponent } from '../../components/exchange-rate-card/exchange-rate-card.component';

@Component({
  selector: 'app-exchange-rate-page',
  standalone: true,
  imports: [
    ExchangeRateCardComponent
  ],
  templateUrl: './exchange-rate-page.component.html',
  styles: ``
})
export default class ExchangeRatePageComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  public exchangeRates: ExchangeRate[] = [];

  constructor() { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exchangeRates }) => {
      this.exchangeRates = exchangeRates;
    });
  }

}
