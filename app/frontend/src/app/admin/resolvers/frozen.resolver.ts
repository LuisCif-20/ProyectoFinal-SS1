import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AccountService } from '../../shared/services/account.service';
import { Account } from '../../shared/interfaces/account.interface';

export const frozenResolver: ResolveFn<Account[]> = (route, state) => {
  const accountService = inject(AccountService);
  return accountService.getFrozenAccounts();
};
