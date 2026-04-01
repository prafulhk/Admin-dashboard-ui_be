import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const decoded: any = token ? jwtDecode(token) : null;
  const role = decoded?.role;
  const allowedRoles = route.data?.['roles'];
  if (allowedRoles && allowedRoles.includes(role)) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};
