import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Account, AccountCreate, AccountRes, AccountType, AccountTypesRes, ExchangeRate, ExchangeRateRes, SingleAccount } from '../interfaces/account.interface';
import { User, UserRes } from '../../auth/interfaces/auth.interface';
import { Res } from '../interfaces/res.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly accountUrl: string = `${ENV.API_URL}/account`;

  private httpClient = inject(HttpClient);

  constructor() { }

  public getUser(email: string): Observable<User> {
    const url: string = `${this.accountUrl}/userA`;
    return this.httpClient.post<UserRes>(url, { email }).pipe(
      map(({ user }) => user),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    )
  }

  public createAccount(data: AccountCreate): Observable<Res> {
    return this.httpClient.post<Res>(this.accountUrl, data).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

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

  public updateExchangeRate(id: string, rate: number): Observable<boolean> {
    const url: string =  `${this.accountUrl}/er`;
    return this.httpClient.patch<Res>(url, { id, rate }).pipe(
      map(() => true),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

  public getAccountsByUser(): Observable<Account[]> {
    const url: string = `${this.accountUrl}/user`;
    return this.httpClient.get<AccountRes>(url).pipe(
      map(({ accounts }) => accounts)
    );
  }

  public getAccountsByUserId(id: string): Observable<Account[]> {
    const url: string = `${this.accountUrl}/id/${id}`;
    return this.httpClient.get<AccountRes>(url).pipe(
      map(({ accounts }) => accounts)
    );
  }

  public getAccountByNumber(account_number: string): Observable<Account> {
    const url: string = `${this.accountUrl}/dataN/${account_number}`;
    return this.httpClient.get<SingleAccount>(url).pipe(
      map(({ account }) => account),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    )
  }

  public changeAccount(user_id: string, account_type_id: string, notifyme: boolean): Observable<boolean> {
    const url: string = `${this.accountUrl}/change`;
    return this.httpClient.post<Res>(url, { user_id, account_type_id, notifyme }).pipe(
      map(() => true),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    ); 
  }

  public switchAccount(user_id: string, account_id: string): Observable<boolean> {
    const url: string = `${this.accountUrl}/switch`;
    return this.httpClient.post<Res>(url, { user_id, account_id }).pipe(
      map(() => true),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    ); 
  }

  public closeAccount(account_id: string, reason: string): Observable<boolean> {
    const url: string = `${this.accountUrl}/close`;
    return this.httpClient.post<Res>(url, { account_id, reason }).pipe(
      map(() => true),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    ); 
  }

}
