import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AccountType } from '../interfaces/account.interface';

export const accountTypesResolver: ResolveFn<AccountType[]> = (route, state) => {
  const accountService = inject(AccountService);
  return accountService.getAccountTypes();
};
