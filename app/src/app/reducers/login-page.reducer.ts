import { Action, createReducer, on } from '@ngrx/store';
import * as LoginPageActions from '../actions/login-page.actions'

export const loginPageFeatureKey = 'loginPage';

export interface State {
  user:{
    username?: string
  }
}

export const initialState: State = {
  user:{}
};

const loginPageReducer = createReducer(
  initialState,
  on(LoginPageActions.login, state => state )
);

export function reducer(state: State | undefined, action: Action) {
  return loginPageReducer(state, action);
}
