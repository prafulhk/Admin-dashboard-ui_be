import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(selectAuthState, (state) => state.isAuthenticated);

export const selectUserRole = createSelector(selectAuthState, (state) => state.role);

export const selectAuthError = createSelector(selectAuthState, (state) => state.error);

export const selectIsLoading = createSelector(selectAuthState, (state) => state.isLoading);
