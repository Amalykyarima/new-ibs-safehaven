import { Component, EventEmitter, Output } from '@angular/core';
import { InputComponent } from '../../../common/utilities/input/input.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../resources/services/auth.service';
import { ResetPassword, Signin } from '../../../resources/models/signin';
import { RouterModule } from '@angular/router';
import { GeneralService } from '../../../resources/services/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as onboardingActions from '../../../resources/store/onboarding/onboarding.actions';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Store, StoreModule } from '@ngrx/store';
import { State } from '../../../resources/store/onboarding/onboarding.reducer';



@Component({
  selector: 'app-corporate-login',
  standalone: true,
  imports: [CommonModule, InputComponent, RouterModule],
  templateUrl: './corporate-login.component.html',
  styleUrl: './corporate-login.component.scss'
})
export class CorporateLoginComponent {

  constructor(
    private authService: AuthService,
    public generalService: GeneralService,
    private router: Router,
    private notification: NzNotificationService,
    private store: Store<State>,
    private routes: ActivatedRoute



  ) {
    this.user = new Signin();
  }
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

  path = window.location.href.includes('create-account')
    ? 'create-account'
    : 'login';

  user: Signin;
  isEmailValid: boolean = false;
  emailAddressLength: number = 0;
  referralId = '';



  @Output() validateUser: EventEmitter<any> = new EventEmitter<any>();
  @Output() getUser: EventEmitter<any> = new EventEmitter<any>();


  ngOnInit(): void {
    this.routes.queryParamMap.subscribe((paths: any) => {
      this.email = paths ? paths.params.user : '';
      this.referralId = paths.params.referringUserId
        ? paths.params.referringUserId
        : '';
      if (paths.params.referringUserId)
        localStorage.setItem('referralId', paths.params.referringUserId);
    });
  }

  handleChange = (name: 'email' | 'password', value: string) => {
    if (name === 'email' && this.email !== value) {
      this.showPassword = false;
      this.getUser.emit({ user: value.trim(), countryCode: '' });
    }
    this.error = { type: '', message: '' };
    this[name] = value.trim();
    if (value && value === '') this.validators[name] = 'Required*';
    else this.validators[name] = '';
  };

  validateEmail = (email: string) => {
    return String(email)
      .trim()
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  verifyEmail = () => {
    if (this.email === '') this.validators.email = 'Required*';
    else if (!this.validateEmail(this.email))
      this.validators.email = 'Enter a valid email address*';
    else {
      this.loading = true;
      this.error = { type: '', message: '' };
      // this.showPassword = true
      this.authService
        .verifyUser({
          type: 'EMAIL',
          userIdentifier: this.email.toLowerCase().trim(),
          sendOtp: this.path === 'create-account',
          accountType: 'Corporate',
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
                    user: this.email.toLowerCase().trim(),
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
  sendOtp = async () => {
    this.loading = true;

    this.error = { type: '', message: '' };
    this.authService
      .verifyUser({
        type: 'EMAIL',
        userIdentifier: this.email.toLowerCase().trim(),
        sendOtp: true,
        accountType: 'Corporate',
      })
      .subscribe({
        next: (res: any) => {
          //(res);
          this.loading_ = false;
          this.success = { message: res.message };
          this.validateUser.emit({
            user: this.email.toLowerCase().trim(),
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

  login = () => {
    if (this.password === '') {
      this.validators = { ...this.validators, password: 'Required*' };
      return;
    }

    let loginData: any = {
      emailAddress: this.email.toLowerCase().trim(),
      password: this.password,
      type: 'EMAIL',
    };
    this.error = { type: '', message: '' };
    this.loading = true;
    this.authService
      .login({
        ...loginData,
        userAgent: this.user.userAgent,
        type: 'EMAIL',
        accountType: 'Corporate',
      })
      .subscribe({
        next: (res: any) => {
          //('response', res);
          if (/^20.*/.test(res.statusCode)) {
            this.loading = false;
            this.notification.success(
              'Account signin successful.',
              '' + res.message,
              { nzClass: 'notification1' }
            );
            if (res.statusCode == 202 || res.statusCode == 201) {
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
                this.generalService.saveUser(res.data);
                this.store.dispatch(
                  onboardingActions.setTwoFAAction({ twoFAType: 'signup' })
                );
              }
              setTimeout(() => {
                this.router.navigate(['/signin/two-factor-authentication']);
              }, 500);
            } else if (res.statusCode == 200) {
              if (res.data?.otpId) {
                let data: ResetPassword = new ResetPassword();
                data = {
                  ...data,
                  phoneNumber: res.data.phoneNumber.split(' ').join('').trim(),
                  otpId: res.data.otpId,
                };
                this.store.dispatch(
                  onboardingActions.setResetDetails({ resetDetails: data })
                );
                this.store.dispatch(
                  onboardingActions.setResetAction({ resetType: 'signin' })
                );
                setTimeout(() => {
                  this.router.navigate(['/reset-password-with-otp']);
                }, 500);
              } else if (res.data?.requiredVerification) {
                const encoded = window.btoa(JSON.stringify(res.data));
                setTimeout(() => {
                  this.router.navigate(['/identity/' + encoded]);
                }, 300);
              } else {
                this.success = { message: res.message };

                // setTimeout(() => {
                //   this.router.navigate(['/reset-password']);
                // }, 500);
              }
            }
          } else {
            this.error = { message: '' + res.message, type: '' };
            this.loading = false;
          }
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
  navigate = () => {
    this.router.navigate(['/signin'], {
      queryParams: {
        countryCode: '',
        user: this.email.toLowerCase().trim(),
        type: 'Corporate',
      },
    });
  };




}

