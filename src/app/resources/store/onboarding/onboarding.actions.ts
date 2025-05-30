import { createAction, props } from '@ngrx/store';
import { ResetPassword, Signin } from '../../../resources/models/signin';

export const setUserType = createAction(
  '[Onboarding] Set User Type',
  props<{ userType: string }>()
);

export const setIdType = createAction(
  '[Onboarding] Set Id Type',
  props<{ idType: string }>()
);

export const setAction = createAction(
  '[Onboarding] Set Action',
  props<{ action: string }>()
);

export const setCompany = createAction(
  '[Onboarding] Set Company',
  props<{ company: object }>()
);

export const setValidationID = createAction(
  '[Onboarding] Set Validation ID',
  props<{ validationID: string }>()
);

export const setOTPVerified = createAction('[Onboarding] set OTP Status');

export const setSignInDetails = createAction(
  '[Onboarding] set Signin Details',
  props<{ signInDetails: Signin; }>()
);

export const setInviteDetails = createAction(
  '[Onboarding] set Invite Token',
  props<{ inviteDetails: object }>()
);

export const setTwoFAAction = createAction(
  '[Onboarding] set Two Factor Action',
  props<{ twoFAType: 'signup' | 'signin' }>()
);

export const setTempUserDetails = createAction(
  '[Onboarding] set Two Factor User',
  props<{ tempUser: object }>()
);

export const setResetDetails = createAction(
  '[Onboarding] set Reset Details',
  props<{ resetDetails: ResetPassword }>()
);

export const setResetAction = createAction(
  '[Onboarding] set Reset Action',
  props<{ resetType: 'reset' | 'signin' }>()
);
