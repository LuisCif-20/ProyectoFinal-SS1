import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Account, AccountRes, AccountType, AccountTypesRes, ExchangeRate, ExchangeRateRes } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly accountUrl: string = `${ENV.API_URL}/account`;

  private httpClient = inject(HttpClient);

  constructor() { }

  public getAccountTypes(): Observable<AccountType[]> {
    return this.httpClient.get<AccountTypesRes>(this.accountUrl).pipe(
      map(({ account_types }) => account_types)
    );
  }

  public getExchangeRates(): Observable<ExchangeRate[]> {
    const url: string = `${this.accountUrl}/exr`;
    return this.httpClient.get<ExchangeRateRes>(url).pipe(
      map(({ exchange_rates }) => exchange_rates)
    );
  }

  public getAccountsByUser(): Observable<Account[]> {
    const url: string = `${this.accountUrl}/user`;
    return this.httpClient.get<AccountRes>(url).pipe(
      map(({ accounts }) => accounts)
    );
  }

}
