import { createAction, props } from '@ngrx/store';

export const loadLoginPages = createAction(
  '[LoginPage] Load LoginPages'
);

export const loadLoginPagesSuccess = createAction(
  '[LoginPage] Load LoginPages Success',
  props<{ data: any }>()
);

export const loadLoginPagesFailure = createAction(
  '[LoginPage] Load LoginPages Failure',
  props<{ error: any }>()
);

export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);
