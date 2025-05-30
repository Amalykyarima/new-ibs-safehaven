import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as GeneralReducer from './general.reducer';

export const selectFeatureState = createFeatureSelector<GeneralReducer.State>(GeneralReducer.generalFeatureKey);


export const selectCurrentUser = createSelector(
    selectFeatureState,
    (state:GeneralReducer.State) => state.currentUser
)
