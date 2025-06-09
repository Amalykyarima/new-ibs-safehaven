import { Component } from '@angular/core';
import { OnboardingLayoutComponent } from "../../../layouts/onboarding-layout/onboarding-layout.component";
import { TabComponent } from "../../../common/utilities/tab/tab.component";
import { IndividualLoginComponent } from "../../../components/onboarding/individual-login/individual-login.component";
import { CorporateLoginComponent } from "../../../components/onboarding/corporate-login/corporate-login.component";
import { CommonModule } from '@angular/common';
import { OtpComponent } from "../../../common/utilities/otp/otp.component";
import { PinComponent } from "../../../common/utilities/pin/pin.component";
import { RouterModule } from '@angular/router';
import { TotpRegisterComponent } from "../../../components/onboarding/totp-register/totp-register.component";

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [RouterModule, OnboardingLayoutComponent, CommonModule, TabComponent, IndividualLoginComponent, CorporateLoginComponent, OtpComponent, PinComponent, TotpRegisterComponent],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  constructor() { }

  ngOnInit(): void {
    // console.log()
  }

  accountType: string = 'Individual';

  animate = false;

  loginData: any = {
    user: '',
    password: '',
    type: '',
  };
  userPayload: any = {};

  showOtp = false;
  showPin = false;

  switchAccountType = (type: string) => {
    this.accountType = type;
    this.showOtp = false;
    this.animate = true;
    setTimeout(() => {
      this.animate = false;
    }, 50);
  };

  validateUser = (userData: any) => {
    this.loginData = userData;
    // console.log(userData)

    this.loginData.accountType = this.accountType;
    this.showOtp = true;
    // console.log(this.loginData);
    // if (this.loginData.type === 'otp') this.showPin = true;
  };
  getUser = (payload: any) => {
    this.userPayload = payload;
  };
}
