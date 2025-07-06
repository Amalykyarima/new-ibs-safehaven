type NatureOfBusiness =
    | 'Agric Business'
    | 'Contracting'
    | 'Financial Institutions'
    | 'Health Care'
    | 'Hospitality'
    | 'Lottery and Games'
    | 'Manufacturing'
    | 'NGOs, Associations and Clubs'
    | 'Professional Practice Firms'
    | 'Religious Bodies'
    | 'Retail Trade'
    | 'Schools'
    | 'Supply'
    | 'Wholesale Trade'
    | 'Technology'
    | 'Creative and Art Industry'
    | 'Others'
    | '';

type RegistrationType =
    | 'Limited Liability Companies'
    | 'Non-Limited Companies'
    | 'Associations and Cooperatives'
    | '';

type Type = 'BVN' | 'NIN' | 'PHONE';

type Title = 'Mr' | 'Mrs' | 'Miss';

type AccountType = 'Savings' | 'Current';

export class Auth {
}

export class Register {
    type: 'PHONE' = 'PHONE';
    identityId: string = '';
    emailAddress: string = '';
    accountType: string = '';
    title: Title = 'Mr';
    gender: 'Male' | 'Female' = 'Male';
    maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated' = 'Single';
    dateOfBirth: string = '';
    password: string = '';
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
    } = {
      street: '',
      city: '',
      state: '',
      country: ''
    };
    referralCode: string = '';
}

export class RegisterCorporate {
    type: 'PHONE' = 'PHONE';
    identityId: string = '';
    emailAddress: string = '';
    accountType: string = 'Current';
    title: Title = 'Mr';
    gender: 'Male' | 'Female' = 'Male';
    maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated' = 'Single';
    password: string = '';
    registrationType: string = '';
    registrationNumber: string = '';
    registrationDate: string = '';
    natureOfBusiness: string = '';
    tin: string = '';
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
    } = {
      street: '',
      city: '',
      state: '',
      country: ''
    };

    directorAddress: {
      street: string;
      city: string;
      state: string;
      country: string;
    } = {
      street: '',
      city: '',
      state: '',
      country: ''
    };
}

export class CompanySignup {
    type: 'CAC-BVN' | 'BVN' | any;
    identityId: string = '';
    emailAddress: string = '';
    accountType: AccountType = 'Current';
    password: string = '';
    title: Title = 'Mr';
    gender: 'Male' | 'Female' = 'Male';
    maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated' =
        'Single';
    registrationType: RegistrationType = '';
    registrationNumber: string = '';
    registrationDate: string = '';
    natureOfBusiness: NatureOfBusiness = '';
    tin: string = '';
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
    } = {
      street: '',
      city: '',
      state: '',
      country: ''
    };
    directorAddress: {
      street: string;
      city: string;
      state: string;
      country: string;
    } = {
      street: '',
      city: '',
      state: '',
      country: ''
    };
}

export class Signin {
    emailAddress: string = "";
    emailAddress1: string = "";
    phoneNumber: string = "";
    type: "PHONE" | "EMAIL" = "PHONE";
    password?: string = "";
    userAgent: string = "";
    fingerPrintEnabled?: boolean;
    fingerPrintToken?: string; //
    fingerprintAvailable: boolean = false;
    biometricSignin: boolean = false;
    biometricToken: string = '';
    biometricType: 'finger' | 'face' | 'biometric' = 'face';
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
    constructor() {
        this.userAgent = navigator.userAgent;
    }
}

export class Signin2 {
    type: "PHONE" | "EMAIL" = "PHONE";
    userIdentifier: string = "";
    sendOtp: any;
    accountType: "Individual"|"Corporate" = "Individual";

}

export class ValidateOtp {
    otpId: any;
}
export class Enrol2FA {
    type: 'SMSEmailOTP' | 'TOTP' | 'PIN' = 'PIN';
    secret?: string;
    token?: string;
}

export class ForgotPassword {
    emailAddress?: string;
    phoneNumber?: string;
    userAgent: string = "";
    constructor() {
        this.userAgent = navigator.userAgent;
    }
}

export class ResetPassword {
    emailAddress: string = "";
    phoneNumber: string = "";
    password: string = "";
    userAgent: string = "";
    otpId?: any;
    otp?: any;
    // Set as 'SMS' to send OTP
    method?: 'SMS' | 'VOICE';
    constructor() {
        this.userAgent = navigator.userAgent;
    }
}
