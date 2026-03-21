import { User } from '../../core/services/user-service';

export interface UsersState {
  users: User[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  loaded: false,
};
