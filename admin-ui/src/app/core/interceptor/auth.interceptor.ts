import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastService);

  const token = localStorage.getItem('token');

  let cloned = req;

  if (token) {
    cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(cloned).pipe(
    catchError((error) => {
      // 🔴 Unauthorized
      if (error.status === 401) {
        localStorage.removeItem('token');
        router.navigate(['/login']);
        toast.showError('Session expired. Please login again');
      } else {
        toast.showError(error.error?.message || 'Something went wrong');
      }

      return throwError(() => error);
    }),
  );
};
