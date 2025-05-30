import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
// import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Enrol2FA, Signin } from '../../../resources/models/signin';
import { AuthService } from '../../../resources/services/auth.service';
import { GeneralService } from '../../../resources/services/general.service';
import { State } from '../../../resources/store/onboarding/onboarding.reducer';
import * as onboardingActions from '../../../resources/store/onboarding/onboarding.actions';
import {
  selectSigninDetails,
  selectTempUser,
  selectTwoFAAction,
} from '../../../resources/store/onboarding/onboarding.selectors';
// import { NzMessageService } from 'ng-zorro-antd/message';
import { NgOtpInputModule } from 'ng-otp-input';
import { OnboardingLayoutComponent } from "../../../layouts/onboarding-layout/onboarding-layout.component";
import { ErrorMessageComponent } from "../../../common/utilities/error-message/error-message.component";
import {
  onboardingFeatureKey,
  OnboardingReducer,
} from '../../../resources/store/onboarding/onboarding.reducer';
@NgModule({
  imports: [
    StoreModule.forFeature(onboardingFeatureKey, OnboardingReducer),
  ],
})
export class OnboardingStoreModule {}



@Component({
  selector: 'app-two-fa',
  standalone: true,
  imports: [CommonModule, NgOtpInputModule, OnboardingLayoutComponent, ErrorMessageComponent,
  ],
  templateUrl: './two-fa.component.html',
  styleUrl: './two-fa.component.scss',
})
export class TwoFaComponent {

  selectedOption: string = '';
  errorMessage: string = '';
  processLoading: boolean = false;
  tempUser: any = {};
  twoFactorAction: string = '';
  newUser: Signin = new Signin();
  new2FA: Enrol2FA = new Enrol2FA();
  //
  showAuthCon: boolean = false;
  // Pin
  pin: string = '';
  pinEnabled: boolean = false;
  @ViewChild('pinOTP1') pinOTP1: any;
  // TOTP
  TOTPEnabled: boolean = false;
  TOTPCode: string = '';
  fetchingTOTP: boolean = false;
  twoFAData: any = {};
  scanQRCode: boolean = true;
  // SMS
  smsEnabled: boolean = false;
  actionType: 'signup' | 'signin' = 'signin';

  customMessage = '';
  ussdString = '';

  constructor(
    // public store: Store<State>,
    private store: Store,
    private router: Router,
    private authService: AuthService,
    // private notification: NzNotificationService,
    public generalService: GeneralService,
    // private message: NzMessageService
  ) {
    this.getTwoFactorActionType();
    this.getSigninDetails();
    this.getTempUser();
    this.twoFAData.qrCode = '';
    this.twoFAData.secret = '';
  }

  ngOnInit(): void {
    this.store.select(selectTwoFAAction).subscribe((value: any) => {
      this.twoFactorAction = value;

      this.actionType = value;
    });
  }

  getTwoFactorActionType() {
    this.store.select(selectTwoFAAction).subscribe((value: any) => {
      this.twoFactorAction = value;
      console.log('this.twoFactorAction', this.twoFactorAction)
      if (!['signup', 'signin'].includes(this.twoFactorAction)) {
        this.router.navigate(['/signin']);
      }
    });
  }


  otpConfig = {
    length: 6,
    disableAutoFocus: true,
    allowNumbersOnly: true,
    isPasswordInput: true,
    inputClass: 'otp-input',
    containerClass: 'pin',
    inputStyles: {
      'min-height': '45px',
    },
  };

  getSigninDetails() {
    this.store.select(selectSigninDetails).subscribe((value: any) => {
      this.newUser = { ...value };
      if ([this.newUser.password].includes('')) {
        this.router.navigate(['/signin']);
      }
    });
  }

  getTempUser() {
    this.store.select(selectTempUser).subscribe((value: any) => {
      this.tempUser = { ...value };
      if (this.tempUser.twoFactorAuthMethods) {
        this.pinEnabled = this.tempUser.twoFactorAuthMethods.some(
          (item: any) => item.type == 'PIN'
        );
        this.TOTPEnabled = this.tempUser.twoFactorAuthMethods.some(
          (item: any) => item.type == 'TOTP'
        );
        this.smsEnabled = this.tempUser.twoFactorAuthMethods.some(
          (item: any) => item.type == 'SMSEmailOTP'
        );

        if (this.pinEnabled) {
          this.selectedOption = 'PIN';
          this.newUser.twoFactorAuthType = 'PIN';
          this.pin = '';
          this.showAuthCon = true;
          this.generalService.changePINInputmode();
        } else if (this.TOTPEnabled) {
          this.selectedOption = 'TOTP';
          this.newUser.twoFactorAuthType = 'TOTP';
          this.TOTPCode = '';
          this.showAuthCon = true;
          this.generalService.changePINInputmode();
        }
      } else {
        this.pinEnabled = this.TOTPEnabled = this.smsEnabled = false;
      }
    });
  }

  async selectOption(type: 'TOTP' | 'PIN' | 'SMSEmailOTP') {
    this.errorMessage = '';
    this.processLoading = false;
    this.selectedOption = type;
    if (type == 'SMSEmailOTP') {
      this.sendOTP();
    } else {
      this.new2FA.type = type;
      if (type == 'TOTP' && this.twoFactorAction == 'signup') {
        this.scanQRCode = true;
        await this.getAuthenticatorSecret();
      } else {
        setTimeout(() => {
          this.showAuthCon = true;
          this.generalService.changePINInputmode();
        }, 500);
      }
    }
  }

  goBackToOptions() {
    this.errorMessage = '';
    this.processLoading = false;
    this.showAuthCon = false;
  }



  onPINChange(event: any) {
    this.pin = event;
    if (event.length == 4) {
      this.twoFactorAction == 'signin' ? this.verify('PIN') : this.enrol('PIN');
    }
  }

  codeConfig = {
    length: 6,
    disableAutoFocus: true,
    allowNumbersOnly: true,
    isPasswordInput: true,
    inputClass: 'otp-input',
    containerClass: 'pin',
    inputStyles: {
      'min-height': '45px',
    },
  };

  onCodeChange(event: any) {
    this.TOTPCode = event;
    if (event.length == 6) {
      this.twoFactorAction == 'signin'
        ? this.verify('TOTP')
        : this.enrol('TOTP');
    }
  }

  async getAuthenticatorSecret() {
    this.errorMessage = '';
    this.fetchingTOTP = true;
    try {
      let res: any = await this.authService.getTOTPData().toPromise();
      this.twoFAData = { ...res.data };
      this.fetchingTOTP = false;
      this.showAuthCon = true;
    } catch (e) {
      this.showAuthCon = false;
      this.goBackToOptions();
      this.errorMessage =
        'An error occured while generating Authenticator data. Please try another method or try again later.';
    }
    this.fetchingTOTP = false;
  }

  toggleQR() {
    this.scanQRCode = !this.scanQRCode;
  }

  async enrol(type: 'TOTP' | 'PIN' | 'SMSEmailOTP') {
    // Only continue if process is not loading
    if (this.processLoading) return;

    this.errorMessage = '';
    this.processLoading = true;
    if (type == 'PIN' && this.pin.length != 4) {
      this.errorMessage = 'Invalid PIN entered';
      this.processLoading = false;
    } else if (type == 'TOTP' && this.TOTPCode.length != 6) {
      this.errorMessage = 'Invalid authenticator code entered';
      this.processLoading = false;
    } else {
      let data = {
        type: type,
        secret: type == 'PIN' ? this.pin : this.twoFAData.secret,
        token: type == 'TOTP' ? this.TOTPCode : undefined,
      };
      // Enrol authentication method
      try {
        let res: any = await this.authService.enrol2FA(data).toPromise();
        // If 1st enrolment is successful
        if (/^20.*/.test(res.statusCode)) {
          // Enrol SMS method
          let data2: Enrol2FA = {
            type: 'SMSEmailOTP',
          };
          let res2: any = await this.authService.enrol2FA(data2).toPromise();
          // If 2nd enrolment is successful
          if (/^20.*/.test(res2.statusCode)) {
            this.processLoading = false;
            // this.notification.success(
            //   'Two factor authentication enrolment successful.',
            //   '' + res2.message,
            //   { nzClass: 'notification1' }
            // );
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 1000);
          } else {
            this.processLoading = false;
            this.errorMessage = res2.message;
          }
        } else {
          this.processLoading = false;
          this.errorMessage = res.message;
        }
      } catch (e) {
        this.processLoading = false;
        this.errorMessage = 'An error occured. Please try again later.';
      }
    }
  }

  verify(type: 'TOTP' | 'PIN' | 'SMSEmailOTP') {
    // Only continue if process is not loading
    if (this.processLoading) return;

    this.errorMessage = '';
    this.processLoading = true;
    if (type == 'PIN' && this.pin.length != 4) {
      this.errorMessage = 'Invalid PIN entered';
      this.processLoading = false;
    } else if (type == 'TOTP' && this.TOTPCode.length != 6) {
      this.errorMessage = 'Invalid authenticator code entered';
      this.processLoading = false;
    } else {
      this.newUser.twoFactorAuthType = type;
      if (type == 'PIN') this.newUser.pin = this.pin;
      if (type == 'TOTP') this.newUser.token = this.TOTPCode;

      this.authService.login(this.newUser).subscribe(
        (res: any) => {
          if (/^20.*/.test(res.statusCode)) {
            this.processLoading = false;
            // this.notification.success(
            //   'Two factor authentication successful.',
            //   '' + res.message,
            //   { nzClass: 'notification1' }
            // );
            this.generalService.saveUser(res.data);
            if (
              !res.data.user.twoFactorAuthMethods.find(
                (item: any) => item.type == 'SMSEmailOTP'
              )
            ) {
              this.registerSMS2FA();
            }
            this.router.navigate(['/dashboard']);
          } else {
            this.processLoading = false;
            this.errorMessage = res.message;
          }
        },
        (error: any) => {
          this.processLoading = false;
          this.errorMessage = 'An error occured. Please try again later.';
        }
      );
    }
  }

  async registerSMS2FA() {
    this.processLoading = true;
    let data2: Enrol2FA = {
      type: 'SMSEmailOTP',
    };
    try {
      let res: any = await this.authService.enrol2FA(data2).toPromise();
    } catch (e) {}
    this.processLoading = false;
  }

  sendOTP() {
    // Only continue if process is not loading
    if (this.processLoading) return;

    this.errorMessage = '';
    this.processLoading = true;
    this.newUser.method = 'SMS';
    this.authService.sendOTP(this.newUser).subscribe(
      (res: any) => {
        if (/^20.*/.test(res.statusCode)) {
          this.processLoading = false;
          this.newUser.otpId = res.data.otpId;
          this.newUser.twoFactorAuthType = 'SMSEmailOTP';
          console.log(res);
          this.store.dispatch(
            onboardingActions.setTwoFAAction({ twoFAType: this.actionType })
          );
          localStorage.setItem('actionType', this.actionType);
          this.store.dispatch(
            onboardingActions.setValidationID({ validationID: res.data.otpId })
          );
          this.store.dispatch(
            onboardingActions.setSignInDetails({
              signInDetails: {
                ...this.newUser,
                customResponse: { message: res.message },
              },
            })
          );
          this.router.navigate(['/onboarding/otp']);
        } else {
          this.processLoading = false;
          this.errorMessage = res.message;
        }
      },
      (error: any) => {
        this.processLoading = false;
        this.errorMessage = 'An error occured. Please try again later.';
      }
    );
  }

  copyNumber(number: any, type: any) {
    if (this.generalService.copyText(number)) {
      // this.message.success(`${type} has been copied to clipboard!`);
    }
  }
}
