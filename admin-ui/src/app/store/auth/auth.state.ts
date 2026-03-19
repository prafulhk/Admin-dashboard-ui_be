export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  role: string | null;
  error: any;
}

export const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  role: null,
  error: null,
};
