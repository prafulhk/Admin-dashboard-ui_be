export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  error: any;
}

export const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  error: null,
};
