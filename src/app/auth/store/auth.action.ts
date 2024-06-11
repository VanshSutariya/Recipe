import { createAction, props } from '@ngrx/store';

export const login = createAction(
  'LOGIN',
  props<{
    email: string;
    userId: string;
    token: string;
    expiresIn: Date;
  }>()
);

export const logout = createAction('LOGOUT');
