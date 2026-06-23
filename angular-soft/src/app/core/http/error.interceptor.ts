import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError, catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (request, next) =>
  next(request).pipe(
    catchError((error: unknown) => {
      const message = error instanceof HttpErrorResponse
        ? error.error?.message ?? error.message
        : 'Error inesperado';

      return throwError(() => new Error(message));
    })
  );
