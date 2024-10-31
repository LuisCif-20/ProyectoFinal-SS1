import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const accessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (authService.token) {
    const clone = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authService.token}`)
    });
    return next(clone);
  }
  return next(req);
};
