import { ResolveFn } from '@angular/router';
import { ExchangeRate } from '../interfaces/account.interface';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';

export const exchangeRatesResolver: ResolveFn<ExchangeRate[]> = (route, state) => {
  const accountService = inject(AccountService);
  return accountService.getExchangeRates();
};
