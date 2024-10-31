import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.user$.pipe(
    filter(user => user !== null),
    take(1),
    map(user => {
      const roles: string[] = route.data['roles'];
      const role: string = user!.role.name;
      if (roles.includes(role)) return true;
      return false;
    })
  );
};
