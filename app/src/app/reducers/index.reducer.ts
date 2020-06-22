import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from '../actions/counter.actions';
import {HttpClient} from '@angular/common/http';
import { Interface } from 'readline';
import { login } from '../actions/login-page.actions';
export const initialState = 0;
export const userRoleState = "guest";
export const isLoggedIn = false;
interface State{

}

export const metaReducers = []


const _reducer = createReducer(initialState,
  on(increment, state => state + 1),
  on(decrement, state => state - 1),
  on(reset, state => 0),
);

const _loginReducer =  createReducer(userRoleState,
  on(login, state => state  )
  )

export function reducer(state, action) {
  return _reducer(state, action);
}

