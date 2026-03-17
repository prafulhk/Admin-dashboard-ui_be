import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';

// auth.effects.ts
@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService.login(action).pipe(
          map((res: any) => {
            localStorage.setItem('token', res.token); // 🔥 important
            return AuthActions.loginSuccess({ token: res.token });
          }),
          tap(() => {
            this.router.navigate(['/dashboard']); // 🔥 HERE
          }),
          catchError((error) => of(AuthActions.loginFailure({ error }))),
        ),
      ),
    ),
  );
}
