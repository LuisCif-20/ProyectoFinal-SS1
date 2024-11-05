import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AllTran, Transaction, TransactionRes } from '../interfaces/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly tranUrl: string = `${ENV.API_URL}/transaction`;

  private httpClient = inject(HttpClient);

  constructor() { }

  public getTransactionsByAccountAndDate(body: { account_id: string; start_date: Date; end_date: Date }): Observable<TransactionRes> {
    const url: string = `${this.tranUrl}/tbud`;
    return this.httpClient.post<TransactionRes>(url, body);
  }

  public getTransactionsByDate(start_date: Date, end_date: Date ): Observable<Transaction[]> {
    const url: string = `${this.tranUrl}/tbd`;
    return this.httpClient.post<AllTran>(url, { start_date, end_date }).pipe(
      map(({transactions}) => transactions)
    );
  }

  public makeTransaction(account_id: string, amount: number, type: string): Observable<boolean> {
    const url: string = `${this.tranUrl}/${type === 'debit' ? 'debit' : 'credit'}`;
    return this.httpClient.post<TransactionRes>(url, { account_id, amount }).pipe(
      map(() => true),
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }

}
