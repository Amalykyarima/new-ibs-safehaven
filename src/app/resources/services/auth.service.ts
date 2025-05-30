import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Enrol2FA, NewSignin, ResetPassword, Signin } from '../models/signin';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public apiService: ApiService, private router: Router) {}

  verifyUser(data: NewSignin) {
    return this.apiService.post(`customer/verify`, data);
  }

  register(data: any) {
    return this.apiService.post(`register`, data);
  }
  newRegister(data: any) {
    return this.apiService.post(`customer/register`, data);
  }

  login(data: Signin) {
    return this.apiService.post(`login`, data);
  }

  validateNewUserOtp = (id: string, data: any) => {
    return this.apiService.put(`identities/${id}/validate`, data);
  };

  sendOTP(data: Signin) {
    return this.apiService.post(`login/send-otp`, data);
  }

  resendOtp(data: Signin) {
    return this.apiService.post(`login/resend-otp`, data);
  }

  authorize() {
    return this.apiService.get(`users/me`);
  }

  resendEmail() {
    return this.apiService.get(`users/resend-verification-email`);
  }

  verifyEmail(data: any) {
    return this.apiService.post(`verify-email`, data);
  }

  resetPassword(data: any) {
    return this.apiService.post(`resetpassword`, data);
  }

  resetPasswordWithPhone(data: any) {
    return this.apiService.post(`resetpassword/otp`, data);
  }

  resendResetOtp(data: ResetPassword) {
    return this.apiService.post(`resetpassword/otp/resend`, data);
  }

  getTOTPData() {
    return this.apiService.get(`users/2fa/totp`);
  }

  enrol2FA(data: Enrol2FA) {
    return this.apiService.post(`users/2fa`, data);
  }

  delete2FA(twoFAId: string) {
    return this.apiService.delete(`users/2fa/${twoFAId}`);
  }
}
