import { inject, Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionRes } from '../interfaces/transaction.interface';

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

}
