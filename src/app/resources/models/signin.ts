export class Signin {
  emailAddress: string = '';
  phoneNumber: string = '';
  type: 'PHONE' | 'EMAIL' = 'PHONE';
  password: string = '';
  userAgent: string = '';
  //  Auth type
  twoFactorAuthType?: 'SMSEmailOTP' | 'TOTP' | 'PIN';
  // For TOTP
  token?: string;
  // For Pin
  pin?: string;
  // For SMS and Email OTP
  otpId?: any;
  otp?: any;
  // Set as 'SMS' to send OTP
  method?: 'SMS' | 'VOICE';
  customResponse?: any;
  constructor() {
    this.userAgent = navigator.userAgent;
  }
}
export class NewSignin {
  type: 'PHONE' | 'EMAIL' | string = 'PHONE';
  userIdentifier: string = '';
  sendOtp: boolean = false;
  accountType?: 'Corporate' | 'Individual';
  method?: 'SMS' | 'VOICE';
}

export class Enrol2FA {
  type: 'SMSEmailOTP' | 'TOTP' | 'PIN' = 'PIN';
  secret?: string;
  token?: string;
}

export class ResetPassword {
  emailAddress: string = '';
  phoneNumber: string = '';
  password: string = '';
  userAgent: string = '';
  otpId?: any;
  otp?: any;
  // Set as 'SMS' to send OTP
  method?: 'SMS' | 'VOICE';
  message?: string;
  constructor() {
    this.userAgent = navigator.userAgent;
  }
}
