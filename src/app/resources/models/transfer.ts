
export class NewTransfer {
    nameEnquiryReference: string = "";
    debitAccountNumber: string = "";
    beneficiaryBankCode: string = "";
    beneficiaryAccountNumber: string = "";
    narration: string = "";
    amount: any = "";
    saveBeneficiary: boolean = false;
    paymentReference: string = "";
    //  Auth type
    twoFactorAuthType?: 'SMSEmailOTP' | 'TOTP' | 'PIN';
    // For TOTP
    token?: string;
    // For Pin
    pin?: string;
    // For SMS and Email OTP
    otpId?: any;
    otp?: any;
}
