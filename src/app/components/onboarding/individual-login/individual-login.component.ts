import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponent } from "../../../common/utilities/input/input.component";
import { AuthService } from '../../../resources/services/auth.service';
import { ResetPassword, Signin } from '../../../resources/models/signin';
import { Router, RouterModule } from '@angular/router';
import * as onboardingActions from '../../../resources/store/onboarding/onboarding.actions';
import { Store, StoreModule } from '@ngrx/store';
import { State } from '../../../resources/store/onboarding/onboarding.reducer';
import { GeneralService } from '../../../resources/services/general.service';
// import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-individual-login',
  standalone: true,
  imports: [CommonModule, InputComponent, RouterModule],
  templateUrl: './individual-login.component.html',
  styleUrl: './individual-login.component.scss'
})
export class IndividualLoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    // private store: Store
    private store: Store<State>,
    // private notification: NzNotificationService,
    private generalService: GeneralService,



  ) {
    this.user = new Signin();

  }

  path = window.location.href.includes('create-account')
    ? 'create-account'
    : 'login';

  @Output() validateUser: EventEmitter<any> = new EventEmitter<any>();
  @Output() getUser: EventEmitter<any> = new EventEmitter<any>();

  user: Signin;
  userType = 'phone';
  error: any = { type: '', message: '' };
  phoneNumber: any = '';

  loading = false;
  loading_ = false;
  success: any = {};

  countryCode = '+234';

  password: string = '';
  passwordType = 'password';
  showPassword = false;
  email: string = '';
  validators = {
    email: '',
    password: '',
    phoneNumber: ''
  };

  formData = {
    email: '',
    password: '',
    phoneNumber: ''

  };


  verifyPhoneNumber = async () => {
    console.log('verifyPhoneNumber', this.phoneNumber)
    if (!this.phoneNumber || this.phoneNumber === '') {
      this.validators.phoneNumber = 'Required*';
    } else {
      this.loading = true;
      this.error = { type: '', message: '' };
      // this.showPassword = true
      this.authService
        .verifyUser({
          type: 'PHONE',
          userIdentifier:
            this.countryCode === '+234' && this.phoneNumber.length > 10
              ? '+234' + this.phoneNumber.trim().slice(1)
              : this.countryCode + this.phoneNumber.trim(),
          sendOtp: this.path === 'create-account',
          accountType: 'Individual',
        })
        .subscribe({
          next: (res: any) => {
            //(res);
            this.loading = false;
            if (res.message === 'User found') {
              this.path === 'create-account'
                ? (this.error = {
                  type: 'signin',
                  message: 'User already exist',
                })
                : (this.showPassword = true);
            } else {
              this.path === 'create-account'
                ? this.validateUser.emit({
                  ...this.user,
                  type: 'otp',
                  user:
                    this.countryCode +
                    (this.countryCode === '+234' &&
                      this.phoneNumber.length > 10
                      ? this.phoneNumber.slice(1)
                      : this.phoneNumber),
                  ...res.data,
                })
                : (this.error = {
                  type: 'create-account',
                  message: res.message,
                });
            }
          },
          error: (err: any) => {
            this.loading = false;
            this.error = {
              type: '',
              message: 'Something went wrong, Please try again',
            };
          },
        });
    }
  };

  // login() {
  //   console.log('Login...');
  // }

  login = async () => {
    if (this.password === '') {
      this.validators = { ...this.validators, password: 'Required*' };
      return;
    }
    let loginData: any = {
      emailAddress:
        this.userType === 'email' ? this.email.toLowerCase().trim() : '',
      phoneNumber:
        this.userType === 'phone'
          ? this.countryCode === '+234' && this.phoneNumber.length > 10
            ? '+234' + this.phoneNumber.trim().slice(1)
            : this.countryCode + this.phoneNumber.trim()
          : '',
      password: this.password,
      type: this.userType.toUpperCase(),
      accountType: 'Individual',
    };
    this.loading = true;
    this.authService
      .login({
        ...loginData,
        userAgent: this.user.userAgent,
        type: this.userType?.toUpperCase(),
        accountType: 'Individual',
      })
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          console.log('login res.data', res.data)


          if (res.data?.requiredVerification) {
            console.log('res.data.requiredVerification')
            this.generalService.newSaveUser1(res.data);

            setTimeout(() => {
              this.router.navigate(['/identity']);
            }, 300);
          } else if (res.statusCode == 202 || res.statusCode == 201) {
            this.store.dispatch(
              onboardingActions.setSignInDetails({
                signInDetails: {
                  ...this.user,
                  ...loginData,
                },
              })
            );
            //(res.data);
            this.store.dispatch(
              onboardingActions.setTempUserDetails({
                tempUser: {
                  ...res.data,
                },
              })
            );

            if (
              res.data.twoFactorAuthMethods &&
              res.data.twoFactorAuthMethods.length >= 1
            ) {
              this.store.dispatch(
                onboardingActions.setTwoFAAction({ twoFAType: 'signin' })
              );
            } else {
              // this.generalService.saveUser(res.data);
              this.store.dispatch(
                onboardingActions.setTwoFAAction({ twoFAType: 'signup' })
              );
            }
            // this.notification.success(
            //   'Account signin successful.',
            //   '' + res.message,
            //   { nzClass: 'notification1' }
            // );

            this.validateUser.emit({ ...this.user, type: 'login' });
            setTimeout(() => {
              this.router.navigate(['/two-factor-authentication']);
            }, 500);
          } else if (res.statusCode == 200) {
            this.generalService.saveUser(res.data);

            if (res.data?.otpId) {
              let data: ResetPassword = new ResetPassword();
              data = {
                ...data,
                phoneNumber: this.countryCode + this.phoneNumber,
                otpId: res.data.otpId,
              };
              data.otpId = res.data.otpId;
              data.message = res.message;
              this.store.dispatch(
                onboardingActions.setResetDetails({ resetDetails: { ...data } })
              );
              this.store.dispatch(
                onboardingActions.setResetDetails({ resetDetails: data })
              );
              this.store.dispatch(
                onboardingActions.setResetAction({ resetType: 'signin' })
              );
              this.validateUser.emit({ ...this.user, type: 'reset' });
              setTimeout(() => {
                this.router.navigate(['/reset-password-with-otp']);
              }, 500);
            } else {
              this.success = { message: res.message };
            }
          } else if (res.statusCode == 400){
            console.log('res.statusCode == 400')
            this.error = {
              type: 'reset-password',
              message: '' + res.message,
            };
          } else {
            if (res.message.includes('Your account has been blocked'))
              this.error = {
                type: 'reset-password',
                message: '' + res.message,
              };
            else this.error = { type: '', message: '' + res.message };
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = {
            type: '',
            message: 'Something went wrong, please try again.',
          };
          this.loading = false;
        },
      });
  };

  getCountryCode = (code: any) => {
    this.countryCode = code;
    this.showPassword = false;
  };


  isPhoneValid(): boolean {
    return /^\d{10,}$/.test(this.phoneNumber); // checks if 10+ digits
  }

  phoneNumberLength: number = 0;


  handleChange = (
    name: 'phoneNumber' | 'password' | 'email',
    value: string
  ) => {
    console.log('handleChange', value)
    if (name === 'phoneNumber' && this.phoneNumber !== value) {
      this.showPassword = false;
      this.getUser.emit({ user: value, countryCode: this.countryCode });
    }
    if (name === 'phoneNumber')
      this[name] = value?.toString()?.replace(/[^0-9]/g, '');
    if (name === 'email') {
      this.showPassword = false;
      this[name] = value;
    } else this[name] = value;
    this.error = { type: '', message: '' };
    if (value && value === '') this.validators[name] = 'Required*';
    else this.validators[name] = '';
  };

  sendOtp = async () => {
    console.log('sendOtp', this.userType)
    this.loading = true;
    this.error = { type: '', message: '' };
    this.userType === 'email'
      ? this.router.navigate(['/create-account'])
      : this.authService
        .verifyUser({
          type: this.userType.toUpperCase(),
          userIdentifier:
            this.countryCode === '+234' && this.phoneNumber.length > 10
              ? '+234' + this.phoneNumber.trim().slice(1)
              : this.countryCode + this.phoneNumber.trim(),
          sendOtp: true,
          accountType: 'Individual',
        })
        .subscribe({
          next: (res: any) => {
            this.router.navigate(['/'])
            //(res);
            // setTimeout(() => {
            //   this.router.navigate(['/two-factor-authentication']);
            // }, 500);
            this.loading_ = false;
            this.success = { message: res.message };
            this.validateUser.emit({
              user: this.phoneNumber,
              type: 'otp',
              ...res.data,
            });
          },
          error: (err: any) => {
            this.loading_ = false;
            this.error = {
              type: '',
              message: 'Something went wrong, Please try again',
            };
          },
        });
  };

  navigate() {
    this.router.navigate(['/signin'], {
      queryParams: {
        countryCode: this.countryCode,
        user: this.phoneNumber,
        type: 'Individual',
      },
    });
  }

  verifyEmail = async () => {
    if (this.email === '') this.validators.email = 'Required*';
    else {
      this.loading = true;
      this.error = { type: '', message: '' };
      // this.showPassword = true
      this.authService
        .verifyUser({
          type: 'EMAIL',
          userIdentifier: this.email?.toLowerCase().trim(),
          sendOtp: false,
          accountType: 'Individual',
        })
        .subscribe({
          next: (res: any) => {
            this.loading = false;
            if (res.message === 'User found') {
              this.showPassword = true;
            } else {
              this.error = {
                type: 'create-account',
                message: 'User not found',
              };
            }
          },
          error: (err: any) => {
            this.loading = false;
            this.error = {
              type: '',
              message: 'Something went wrong, Please try again',
            };
          },
        });
    }
  };
}
