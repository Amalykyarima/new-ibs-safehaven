import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnboardingLayoutComponent } from '../../../layouts/onboarding-layout/onboarding-layout.component';
import { TabComponent } from "../../../common/utilities/tab/tab.component";
import { AuthService } from '../../../resources/services/auth.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CorporateLoginComponent } from "../../../common/layout/corporate-login/corporate-login.component";
import { IndividualLoginComponent } from "../../../common/layout/individual-login/individual-login.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, OnboardingLayoutComponent, TabComponent, CorporateLoginComponent, IndividualLoginComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private routes: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.path = location.pathname.slice(1);
    // //(this.path);
    this.routes.params.subscribe((paths) => {
      this.accountType =
        paths && paths['params'] ? paths['params'].type : 'Individual';
    });
    //(this.accountType)
  }

  accountType: string = 'Individual';

  animate = false;
  path = '';
  userPayload: any = {};

  loginData: any = {
    user: '',
    password: '',
    type: '',
    accountType: this.accountType,
  };

  showOtp = false;
  showPin = false;
  resending = false;
  showTimer = false;

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
    if (this.loginData.type === 'login') {
      this.showPin = true;
    } else if (this.loginData.type === 'otp') {
      this.showOtp = true;
      this.loginData.accountType = this.accountType;
    }
  };
  verifyUser = async (type: 'SMS' | 'VOICE' = 'SMS') => {
    this.resending = true;
    // console.log(type);
    this.authService
      .verifyUser({
        type: this.loginData.accountType === 'Individual' ? 'PHONE' : 'EMAIL',
        userIdentifier: this.loginData.user,
        sendOtp: true,
        method: type,
      })
      .subscribe({
        next: (res) => {},
        error: (err) => {},
      });
  };
  getUser = (payload: any) => {
    this.userPayload = payload;
  };
}

