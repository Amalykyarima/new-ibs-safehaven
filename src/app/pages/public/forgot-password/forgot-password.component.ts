import { Component, Input, OnInit } from '@angular/core';
import { InputComponent } from "../../../common/utilities/input/input.component";
import { CommonModule } from '@angular/common';
import { OnboardingLayoutComponent } from "../../../layouts/onboarding-layout/onboarding-layout.component";
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";
import { FormBuilder } from '@angular/forms';
import { Store, State } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { ForgotPassword } from '../../../resources/models/auth';
import { ResetPassword } from '../../../resources/models/signin';
import { ApiService } from '../../../resources/services/api.service';
import { AuthService } from '../../../resources/services/auth.service';
import { GeneralService } from '../../../resources/services/general.service';
import { environment } from '../../../../environments/environment';
import { SharedDataService } from '../../../resources/services/shared-data.service';
import { OtpComponent } from "../../../common/utilities/otp/otp.component";
import { OtpInputComponent } from "../../../common/utilities/otp-input/otp-input.component";


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, InputComponent, RouterModule, OnboardingLayoutComponent, ButtonFilledComponent, OtpInputComponent, OtpComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {

  resetType: 'email' | 'phoneNumber' = 'phoneNumber';
  // subs: SubSink = new SubSink();
  errorMessage: string = '';
  processLoading: boolean = false;
  countryISO!: string;
  // form: FormGroup;
  //
  showResetPasswordModal: boolean = false;
  resetActionType: 'signin' | 'reset' = 'reset';
  resetDetails: any;
  environment: typeof environment = environment;

  countryCode: string = '+234';
  flag: string = '';
  showDropdown = false;
  countries: any = [];
  verifiedData: any;
  userType: any;
  loginData: any;
  show: boolean = true;
  pin: any = '';
  changePassword: boolean = false;
  showOtp: boolean = false;
  passwordsMatch: boolean = false;
  showPasswordMatch: boolean = false;
  loading: boolean = false;
  successPage: boolean = false;
  // emailSuccess: boolean = false;
  emailSentPage: boolean = false;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private generalService: GeneralService,
    private router: Router,
    private sharedDataService: SharedDataService,

  ) { }

  error: any = { type: '', message: '' };
  phoneNumber: any = '';
  email: any = '';
  password: any = '';
  confirmPassword: any = '';
  showPassword = false;
  validators = {
    email: '',
    password: '',
    phoneNumber: '',
    confirmPassword: '',
  };

  @Input() accountType: 'Individual' | 'Corporate' = 'Individual';
  @Input() inputSpinner: boolean = false;


  ngOnInit(): void {
    this.loginData = this.sharedDataService.getLoginData();
    this.userType = this.loginData?.accountType;

    if (this.loginData) {
      const rawIdentifier = this.loginData.userIdentifier;

      if (this.userType === 'Individual') {
        const localPhone = this.stripCountryCode(rawIdentifier);
        this.phoneNumber = localPhone;
        console.log('phone', this.phoneNumber);
      } else {
        this.email = rawIdentifier;
        console.log('email', this.email);
      }
    }
  }

  onPinChange(value: string) {
    this.pin = value;
    this.error = '';
    this.errorMessage = '';
  }

  handleOtp(value: string) {
    console.log('handleOtp', value)
    // ✅ Called only when 6-digit OTP is complete
    this.pin = value;
    this.error = '';
    this.errorMessage = '';
    // this.verifyOtp();
    this.changeToPasswordForm();
  }

  changeToPasswordForm() {
    this.show = false;
    this.showOtp = false
    this.changePassword = true;
  }

  changeToOtpForm() {
    this.show = false;
    this.showOtp = true
  }

  gotoOTPform() {
    this.show = false;
    this.showOtp = true;
    this.changePassword = false;
    this.successPage = false;
  }

  gotoResetForm() {
    this.show = true;
    this.showOtp = false;
    this.changePassword = false;
    this.successPage = false;
  }


  passwordResetSuccessful() {
    this.show = false;
    this.showOtp = false
    this.changePassword = false;
    this.successPage = true
  }

  emailSentSuccessful() {
    this.show = false;
    this.showOtp = false
    this.changePassword = false;
    this.successPage = false;
    this.emailSentPage = true;
  }

  verifyOtp = () => {
    // this.error = 'Invalid otp';
    //('click', this.loginData);
    this.error = '';
    this.errorMessage = '';
    if (this.pin.length !== 6) this.error = 'Required*';
    else {
      // this.loading = true;
      this.authService
        .validateNewUserOtp(this.loginData._id, {
          otp: this.pin,
        })
        .subscribe({
          next: (res: any) => {
            // this.loading = false;
            if (res.statusCode === 200) {

              console.log('logindataaa', this.loginData)
              this.sharedDataService.setLoginData(this.loginData);

              if (this.loginData.accountType === 'Corporate') {
                setTimeout(() => {
                  this.router.navigate(['/setup-account-corporate']);
                }, 500);
              } else {
                setTimeout(() => {
                  this.router.navigate(['/setup-account-corporate']);
                }, 500);
              }
            } else if (
              res.statusCode === 400 &&
              res.message === 'Incorrect OTP.'
            ) {
              this.errorMessage = res.message;
              this.error = res.message;
            } else {
              this.errorMessage = 'Something went wrong, please try again';
              this.error = 'Something went wrong, please try again';
            }
          },
          error: (err) => {
            // this.loading = false;
            this.errorMessage = 'Something went wrong, please try again';
            this.error = 'Something went wrong, please try again';
          },
        });
    }
    // this.validate.emit('this.pin');
  };

  resetPassword() {
    // Only continue if process is not loading
    // if (this.processLoading) return;
    this.processLoading = true;
    this.error = { type: '', message: '' };

    this.resetDetails.password = this.password;
    this.resetDetails.otp = this.pin;
    delete this.resetDetails.method;
    if (
      this.password.length > 4 &&
      this.pin.length === 6 &&
      this.password === this.confirmPassword
    ) {
      this.processLoading = true;
      this.authService.resetPasswordWithPhone(this.resetDetails).subscribe(
        (res: any) => {
          if (res.statusCode === 200) {
            this.processLoading = false;

            // this.notification.success(
            //   'Password reset successful.',
            //   '' + res.message,
            //   { nzClass: 'notification1' }
            // );
            this.passwordResetSuccessful()
            // setTimeout(() => {
            //   this.router.navigate(['/signin']);
            // }, 1000);
          } else if (res.statusCode === 400) {
            if (res.message === 'Incorrect OTP.') {
              this.error =

                res.message,

              this.gotoOTPform()
            } else {
              this.errorMessage = '' + res.message;
              this.processLoading = false;
            }
          }
          else {
            this.errorMessage = '' + res.message;
            this.processLoading = false;
          }
        },
        (error: any) => {
          this.errorMessage = 'An error occured. Please try again later';
          this.processLoading = false;
        }
      );
    } else {
      // this.validateForm();
    }
  }

  goToSigning() {
    setTimeout(() => {
      this.router.navigate(['/signin']);
    }, 1000);
  }

  // ngOnInit(): void {
  //   this.loginData = this.sharedDataService.getLoginData();

  //   this.userType = this.loginData?.accountType;
  //   console.log('this.userType && this.verifiedData', this.verifiedData, this.loginData)
  //   if (this.loginData && this.userType === 'Individual' ){
  //     // this.phoneNumber = this.loginData.userIdentifier;
  //     console.log('phone',  this.loginData?.userIdentifier )
  //   } else {
  //     this.email = this.loginData?.userIdentifier;
  //     console.log('email', this.email)

  //   }
  // }

  stripCountryCode(phone: string): string {
    return phone.startsWith('+234') ? phone.slice(4) : phone;
  }



  getCountryCode = (code: any) => {
    this.countryCode = code;
  };

  handleChange = (
    name: 'email' | 'password' | 'phoneNumber' | 'confirmPassword',
    value: string
  ) => {
    if (name === 'email' && this.email !== value) this.showPassword = false;
    this[name] = value;
    if (value === '') this.validators[name] = 'Required*';
    else this.validators[name] = '';
  };

  close_() {
    this.router.navigate(['/signin'])
  }

  forgotPassword() {
    console.log('forgotPassword-----', this.userType, this.pin, this.phoneNumber)
    this.processLoading = true;
    // if (this.processLoading) return;

    // this.errorMessage = '';

    // this.form.markAllAsTouched();
    // this.form.markAsDirty();

    // if (this.form.invalid) {
    //     this.errorMessage = 'All fields are required.';
    //     return;
    // }

    this.errorMessage = '';

    let data: ForgotPassword = {
      userAgent: navigator.userAgent
    }
    // this.processLoading = true;
    if (this.loginData?.accountType === 'Individual') {
      data.phoneNumber = this.countryCode + this.phoneNumber;
      // data.phoneNumber = this.countryCode +
      // (this.countryCode === '+234' && this.phoneNumber.length > 10
      //   ? this.phoneNumber.slice(1)
      //   : this.phoneNumber)
      this.resetWithPhone(data);
    } else {
      data.emailAddress = this.email;
      this.resetWithEmail(data);
    }
  }

  // resetWithEmail(data: ForgotPassword) {
  //   console.log('resetWithEmail', data)

  //   this.authService.resetPassword(data).subscribe({
  //     next: (res: any) => {
  //       console.log('resetPassword', res)
  //       this.processLoading = false;
  //       if (!/^20.*/.test(res.statusCode)) {
  //         this.errorMessage = res.message;
  //         // this.generalService.showErrorMessage(res.message);
  //         return;
  //       }
  //       this.changeToOtpForm()
  //       let resetData: ResetPassword = new ResetPassword();
  //       resetData.phoneNumber = data.phoneNumber!;
  //       resetData.otpId = res.data.otpId;
  //       this.resetDetails = resetData;
  //       console.log('this.resetDetails', this.resetDetails)

  //       this.generalService.showSuccessMessage(res.message);
  //       // this.form.reset();
  //     },
  //     error: (error: any) => {
  //       // this.generalService.showErrorMessage('An error occured. Please try again later');
  //       this.processLoading = false;
  //     }
  //   })
  // }

  resetWithEmail(data: any) {
    console.log('resetWithEmail', data)

    this.processLoading = true;
    this.authService.resetPassword(data).subscribe(
      (res: any) => {
        this.processLoading = false;

        if (res.statusCode === 200) {
          // this.emailSuccess = true;
          this.emailSentSuccessful();
        } else {
          this.errorMessage = '' + res.message;
          this.processLoading = false;
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.processLoading = false;
      }
    );
  }

  resetWithPhone(data: ForgotPassword) {
    console.log('resetWithPhone', data)
    this.authService.resetPasswordWithPhone(data).subscribe({
      next: (res: any) => {
        this.processLoading = false;
        if (!/^20.*/.test(res.statusCode)) {
          this.errorMessage = res.message;
          // this.generalService.showErrorMessage(res.message);
          return;
        }

        this.changeToOtpForm()
        let resetData: ResetPassword = new ResetPassword();
        resetData.phoneNumber = data.phoneNumber!;
        resetData.otpId = res.data.otpId;
        this.resetDetails = resetData;
        console.log('this.resetDetails', this.resetDetails)

        // this.showResetPasswordModal = true;
      },
      error: (error: any) => {
        // this.generalService.showErrorMessage('An error occured. Please try again later');
        this.errorMessage = 'An error occured. Please try again later';
        this.processLoading = false;
      }
    })
  }

  resendOTP(method: 'SMS' | 'VOICE') {
    this.errorMessage = '';
    this.resetDetails.method = method;
    this.authService.resendResetOtp(this.resetDetails).subscribe({
      next: (res: any) => {
        if (!/^20.*/.test(res.statusCode)) {
          this.errorMessage = res.message;
          return;
        }
        this.generalService.showSuccessMessage('OTP resent successfully.');
      },
      error: (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
      }
    })
  }

  passwordChecks = {
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLongEnough: false
  };

  handleChangePassword(field: string, value: string) {
    if (field === 'password') {
      this.password = value;
      this.validatePassword(value);
      this.comparePasswords(); // also recheck match
    } else if (field === 'confirmPassword') {
      this.confirmPassword = value;
      this.comparePasswords();
    }
  }

  validatePassword(password: string) {
    this.passwordChecks = {
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      isLongEnough: password.length > 11
    };
  }

  get isPasswordValid(): boolean {
    return Object.values(this.passwordChecks).every(Boolean);
  }

  comparePasswords() {
    this.showPasswordMatch = this.confirmPassword.length > 0;
    this.passwordsMatch = this.password === this.confirmPassword;
  }

  get canSubmit(): boolean {
    const checks = Object.values(this.passwordChecks).every(Boolean);
    return checks && this.passwordsMatch;
  }


}
