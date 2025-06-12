// import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as OnboardingReducer from './onboarding.reducer';



export const selectFeatureState = createFeatureSelector<OnboardingReducer.State>(OnboardingReducer.onboardingFeatureKey);

export const selectUserType = createSelector(
    selectFeatureState,
    (state: OnboardingReducer.State) => state.userType
);

export const selectIDType = createSelector(
    selectFeatureState,
    (state: OnboardingReducer.State) => state.idType
);

export const selectActionType = createSelector(
    selectFeatureState,
    (state: OnboardingReducer.State) => state.action
);

export const selectCompany = createSelector(
    selectFeatureState,
    (state: OnboardingReducer.State) => state.company
);

export const selectValidationID = createSelector(
    selectFeatureState,
    (state: OnboardingReducer.State) => state.validationID
);

export const selectOTPVerified = createSelector(
    selectFeatureState,
    (state: OnboardingReducer.State) => state.OTPVerified
);

export const selectSigninDetails = createSelector(
    selectFeatureState,
    (state: OnboardingReducer.State) => state.signInDetails
);

export const selectInviteDetails = createSelector(
    selectFeatureState,
    (state: OnboardingReducer.State) => state.inviteDetails
);

export const selectTwoFAAction = createSelector(
    selectFeatureState,
    (state: OnboardingReducer.State) => state.twoFAActionType
);


export const selectTempUser = createSelector(
    selectFeatureState,
    (state: OnboardingReducer.State) => state.tempUser
);

export const selectResetDetails = createSelector(
    selectFeatureState,
    (state: OnboardingReducer.State) => state.resetDetails
);

export const selectResetAction = createSelector(
    selectFeatureState,
    (state: OnboardingReducer.State) => state.resetActionType
);
