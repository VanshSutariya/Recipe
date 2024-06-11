import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/auth/user.model';
import { login, logout } from './auth.action';

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export const AuthReducer = createReducer(
  initialState,
  on(login, (state, action) => {
    const user = new User(
      action.email,
      action.userId,
      action.token,
      action.expiresIn
    );

    return {
      ...state,
      user: user,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);
