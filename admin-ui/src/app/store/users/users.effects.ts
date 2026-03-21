import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, withLatestFrom } from 'rxjs';
import { UserService } from '../../core/services/user-service';
import * as UsersActions from './users.actions';
import { Store } from '@ngrx/store';
import { selectUsersLoaded } from './users.selectors';

@Injectable({ providedIn: 'root' })
export class UsersEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private store = inject(Store);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      withLatestFrom(this.store.select(selectUsersLoaded)),
      filter(([_, loaded]) => !loaded),
      switchMap(() =>
        this.userService.getUsers().pipe(map((users) => UsersActions.loadUsersSuccess({ users }))),
      ),
    ),
  );
}
