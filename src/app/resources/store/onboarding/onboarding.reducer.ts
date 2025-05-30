import { Action, createReducer, on } from '@ngrx/store';
import { ResetPassword, Signin } from '../../models/signin';
import * as OnboardingActions from './onboarding.actions';


export const onboardingFeatureKey = 'onboarding';

export interface State {
    userType: string,
    idType: string,
    action: string,
    company: object,
    validationID: string,
    OTPVerified: boolean,
    signInDetails: Signin,
    resetDetails: ResetPassword | undefined,
    twoFAActionType: string;
    resetActionType: 'reset' | 'signin';
    tempUser: object;
    inviteDetails: object
}

export const initialState: State = {
    userType: '',
    idType: '',
    action: '',
    company: {},
    validationID: '',
    OTPVerified: false,
    signInDetails: new Signin(),
    resetDetails: undefined,
    twoFAActionType: '',
    resetActionType: 'reset',
    tempUser: {},
    inviteDetails: {
        userType: '',
        inviteToken: ''
    }
};


export const reducer = createReducer(
    initialState,
    on(OnboardingActions.setUserType, (state: State, { userType }) => ({
        ...state,
        userType: userType
    })),
    on(OnboardingActions.setIdType, (state: State, { idType }) => ({
        ...state,
        idType: idType,
        OTPVerified: false
    })),
    on(OnboardingActions.setAction, (state: State, { action }) => ({
        ...state,
        action: action
    })),
    on(OnboardingActions.setCompany, (state: State, { company }) => ({
        ...state,
        company: company
    })),
    on(OnboardingActions.setValidationID, (state: State, { validationID }) => ({
        ...state,
        validationID: validationID,
    })),
    on(OnboardingActions.setOTPVerified, (state: State) => ({
        ...state,
        OTPVerified: true
    })),
    on(OnboardingActions.setSignInDetails, (state: State, { signInDetails }) => ({
        ...state,
        signInDetails: signInDetails
    })),
    on(OnboardingActions.setResetDetails, (state: State, { resetDetails }) => ({
        ...state,
        resetDetails: resetDetails
    })),
    on(OnboardingActions.setInviteDetails, (state: State, { inviteDetails }) => ({
        ...state,
        inviteDetails: inviteDetails
    })),
    on(OnboardingActions.setTwoFAAction, (state: State, { twoFAType }) => ({
        ...state,
        twoFAActionType: twoFAType
    })),
    on(OnboardingActions.setTempUserDetails, (state: State, { tempUser }) => ({
        ...state,
        tempUser: tempUser
    })),
    on(OnboardingActions.setResetAction, (state: State, { resetType }) => ({
        ...state,
        resetActionType: resetType
    })),
);

export function OnboardingReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}

