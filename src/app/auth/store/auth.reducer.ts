import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/auth/user.model';
import {
  clearError,
  login,
  login_fail,
  login_start,
  logout,
  signup_start,
} from './auth.action';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
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
      authError: null,
      user: user,
      loading: false,
    };
  }),
  on(login_start, (state) => {
    return {
      ...state,
      authError: null,
      loading: true,
    };
  }),
  on(login_fail, (state, action) => {
    return {
      ...state,
      authError: action.value,
      loading: false,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(signup_start, (state) => {
    return {
      ...state,
      authError: null,
      loading: true,
    };
  }),
  on(clearError, (state) => {
    return {
      ...state,
      authError: null,
    };
  })
);
