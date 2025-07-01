import { Component, Input, OnInit } from '@angular/core';
import { InputComponent } from "../../../common/utilities/input/input.component";
import { CommonModule } from '@angular/common';
import { OnboardingLayoutComponent } from "../../../layouts/onboarding-layout/onboarding-layout.component";
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";
import { FormBuilder } from '@angular/forms';
import { Store, State } from '@ngrx/store';
import { Router } from '@angular/router';
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
  imports: [CommonModule, InputComponent, OnboardingLayoutComponent, ButtonFilledComponent,  OtpInputComponent],
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

  countryCode: string = '234';
  flag: string = '';
  showDropdown = false;
  countries: any = [];
  verifiedData: any;
  userType: any;
  loginData: any;


  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private generalService: GeneralService,
    private router: Router,
    private sharedDataService: SharedDataService,

    // private store: Store<State>,
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
    console.log('forgotPassword-----', this.userType)

    // if (this.processLoading) return;

    // this.errorMessage = '';

    // this.form.markAllAsTouched();
    // this.form.markAsDirty();

    // if (this.form.invalid) {
    //     this.errorMessage = 'All fields are required.';
    //     return;
    // }

    let data: ForgotPassword = {
      userAgent: navigator.userAgent
    }
    // this.processLoading = true;
    if (this.loginData?.accountType === 'Individual') {

      data.phoneNumber = this.countryCode +
      (this.countryCode === '+234' && this.phoneNumber.length > 10
        ? this.phoneNumber.slice(1)
        : this.phoneNumber)
      this.resetWithPhone(data);
    }
    else {
      data.emailAddress = this.email;
      this.resetWithEmail(data);
    }
  }

  resetWithEmail(data: ForgotPassword) {
    console.log('resetWithEmail', data)

    this.authService.resetPassword(data).subscribe({
      next: (res: any) => {
        console.log('resetPassword', res)
        this.processLoading = false;
        if (!/^20.*/.test(res.statusCode)) {
          this.errorMessage = res.message;
          // this.generalService.showErrorMessage(res.message);
          return;
        }
        this.generalService.showSuccessMessage(res.message);
        // this.form.reset();
      },
      error: (error: any) => {
        // this.generalService.showErrorMessage('An error occured. Please try again later');
        this.processLoading = false;
      }
    })
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

        let resetData: ResetPassword = new ResetPassword();
        resetData.phoneNumber = data.phoneNumber!;
        resetData.otpId = res.data.otpId;
        this.resetDetails = resetData;

        // this.showResetPasswordModal = true;
      },
      error: (error: any) => {
        // this.generalService.showErrorMessage('An error occured. Please try again later');
        this.errorMessage = 'An error occured. Please try again later';
        this.processLoading = false;
      }
    })
  }

  passwordResetSuccessful() {
    // this.showResetPasswordModal = false;
    // this.router.navigate(['/signin'])
  }
}
