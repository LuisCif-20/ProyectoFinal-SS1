import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs';
import { AuthStatus } from '../interfaces/auth.interface';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.authStatus$.pipe(
    filter(status => status !== AuthStatus.Checking),
    take(1),
    map(status => {
      if (status === AuthStatus.Authenticated) return true;
      router.navigateByUrl('/auth');
      return false;
    })
  );
};
