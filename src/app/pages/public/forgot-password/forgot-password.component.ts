import { Component, Input, OnInit } from '@angular/core';
import { InputComponent } from "../../../common/utilities/input/input.component";
import { CommonModule } from '@angular/common';
import { OnboardingLayoutComponent } from "../../../layouts/onboarding-layout/onboarding-layout.component";
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";
import { FormBuilder } from '@angular/forms';
import { Store, State } from '@ngrx/store';
import { Router } from 'express';
import { ForgotPassword } from '../../../resources/models/auth';
import { ResetPassword } from '../../../resources/models/signin';
import { ApiService } from '../../../resources/services/api.service';
import { AuthService } from '../../../resources/services/auth.service';
import { GeneralService } from '../../../resources/services/general.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, InputComponent, OnboardingLayoutComponent, ButtonFilledComponent],
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


  constructor(
    private apiService: ApiService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private generalService: GeneralService,
        private router: Router,
        // private store: Store<State>,
  ) { }

  ngOnInit(): void { }
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
  getCountryCode = (code: any) => {
    this.countryCode = code;
  };
  @Input() accountType: 'Individual' | 'Corporate' = 'Individual';

  handleChange = (
    name: 'email' | 'password' | 'phoneNumber' | 'confirmPassword',
    value: string
  ) => {
    if (name === 'email' && this.email !== value) this.showPassword = false;
    this[name] = value;
    if (value === '') this.validators[name] = 'Required*';
    else this.validators[name] = '';
  };

  forgotPassword() {
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
    if (this.resetType == 'phoneNumber') {
        // data.phoneNumber = `+234${this.form.value.phoneNumber}`;
        // this.resetWithPhone(data);
    }
    else {
        // data.emailAddress = this.form.value.emailAddress.toLowerCase();
        // this.resetWithEmail(data);
    }
}

resetWithEmail(data: ForgotPassword) {
  this.authService.resetPassword(data).subscribe({
      next: (res: any) => {
          // this.processLoading = false;
          // if (!/^20.*/.test(res.statusCode)) {
          //     this.errorMessage = res.message;
          //     this.generalService.showErrorMessage(res.message);
          //     return;
          // }
          this.generalService.showSuccessMessage(res.message);
          // this.form.reset();
      },
      error: (error: any) => {
          // this.generalService.showErrorMessage('An error occured. Please try again later');
          // this.processLoading = false;
      }
  })
}

resetWithPhone(data: ForgotPassword) {
  this.authService.resetPasswordWithPhone(data).subscribe({
      next: (res: any) => {
          // this.processLoading = false;
          // if (!/^20.*/.test(res.statusCode)) {
          //     this.errorMessage = res.message;
          //     this.generalService.showErrorMessage(res.message);
          //     return;
          // }

          let resetData: ResetPassword = new ResetPassword();
          resetData.phoneNumber = data.phoneNumber!;
          resetData.otpId = res.data.otpId;
          // this.resetDetails = resetData;
          // this.showResetPasswordModal = true;
      },
      error: (error: any) => {
          // this.generalService.showErrorMessage('An error occured. Please try again later');
          // this.errorMessage = 'An error occured. Please try again later';
          // this.processLoading = false;
      }
  })
}

passwordResetSuccessful() {
  // this.showResetPasswordModal = false;
  // this.router.navigate(['/signin'])
}
}
