import { createAction, props } from '@ngrx/store';

export const login = createAction(
  'LOGIN',
  props<{
    email: string;
    userId: string;
    token: string;
    expiresIn: Date;
    redirect: boolean;
  }>()
);

export const logout = createAction('LOGOUT');

export const login_start = createAction(
  'LOGIN_START',
  props<{ value: { email: string; password: string } }>()
);

export const login_fail = createAction(
  'LOGIN_FAIL',
  props<{ value: string }>()
);
export const signup_start = createAction(
  'SIGNUP_START',
  props<{ email: string; password: string }>()
);
export const clearError = createAction('CLEAR_ERROR');
export const auto_login = createAction('AUTO_LOGIN');
