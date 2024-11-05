import { ResolveFn } from '@angular/router';
import { Account } from '../../shared/interfaces/account.interface';
import { inject } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';

export const accountsResolver: ResolveFn<Account[]> = (route, state) => {
  const accountService = inject(AccountService);
  return accountService.getAllAccounts();
};
