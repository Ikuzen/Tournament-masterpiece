import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as LoginPageActions from '../actions/login-page.actions'
import {Tournament} from '../pages/tournaments/tournament'
import { User } from '../pages/users/user';
export const loginPageFeatureKey = 'loginPage';

export interface ApplicationState {
  currentlyLoading: boolean;
  currentUser: {
    username?: string,
    id?: string,
    role?: string;
  }
  tournamentList: Tournament[];
  userList: User[];
}

export const initialState: ApplicationState = {
  currentlyLoading: false,
  currentUser: {
    username: "",
    id:"",
    role: "guest"
  },
  tournamentList: [],
  userList: []
};
export const userSelector = createFeatureSelector<ApplicationState>('State');

const loginPageReducer = createReducer(
  initialState,
  on(LoginPageActions.login,
    (state, {currentUser}) => ({...state, currentUser})
  ))

export function reducer(state: ApplicationState | undefined, action: Action) {
  return loginPageReducer(state, action);
}
