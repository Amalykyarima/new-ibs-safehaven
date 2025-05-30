import { Action, createReducer, on } from '@ngrx/store';
import * as GeneralActions from './general.actions';


export const generalFeatureKey = 'general';

export interface State {
  currentUser: object
}

export const initialState: State = {
  currentUser: {}
};


export const reducer = createReducer(
  initialState,
  on(GeneralActions.saveCurrentUser, (state: State, { currentUser }) => ({
    ...state,
    currentUser: currentUser
  }))
);

export function GeneralReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}

