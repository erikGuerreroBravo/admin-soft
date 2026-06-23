import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthFacade } from '../auth/application/auth.facade';
import { getDeviceId } from './device-id';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthFacade);
  const router = inject(Router);
  const token = auth.accessToken();
  const isAuthEndpoint = request.url.includes('/Auth/login') || request.url.includes('/Auth/refresh-token');

  const securedRequest = request.clone({
    setHeaders: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'X-Device-Id': getDeviceId()
    }
  });

  return next(securedRequest).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && token && !isAuthEndpoint) {
        return auth.refreshSession().pipe(
          switchMap(() => {
            const refreshedToken = auth.accessToken();
            if (!refreshedToken) {
              void router.navigate(['/login']);
              return throwError(() => error);
            }

            return next(request.clone({
              setHeaders: {
                Authorization: `Bearer ${refreshedToken}`,
                'X-Device-Id': getDeviceId()
              }
            }));
          })
        );
      }

      return throwError(() => error);
    })
  );
};
