import { Component, EventEmitter, Output } from '@angular/core';
import { InputComponent } from '../../utilities/input/input.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../resources/services/auth.service';
import { Signin } from '../../../resources/models/signin';
import { RouterModule } from '@angular/router';
import { GeneralService } from '../../../resources/services/general.service';
import { Router } from '@angular/router';


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
    // public generalService: GeneralService,
    private router: Router,


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
  @Output() validateUser: EventEmitter<any> = new EventEmitter<any>();
  @Output() getUser: EventEmitter<any> = new EventEmitter<any>();

  // handleChange(field: keyof typeof this.formData, value: string) {
  //   this.formData[field] = value;
  // }

  // handleChange(field: 'email' | 'password', value: string) {
  //   this[field] = value;
  // }



  verifyPhoneNumber() {
    console.log('Verify phone number:', this.phoneNumber);
  }

  login() {
    console.log('Login...');
  }


  getCountryCode = (code: any) => {
    this.countryCode = code;
    this.showPassword = false;
  };


  isPhoneValid(): boolean {
    return /^\d{10,}$/.test(this.phoneNumber); // checks if 10+ digits
  }

  emailAddressLength: number = 0;

  handleChange(field: string, value: string) {
    if (field === 'email') {
      this.email = value;
      this.validateEmailFormat(value);
    }
    // handle other fields...
  }


  isEmailValid: boolean = false;

  validateEmailFormat(email: string): void {
    const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const trimmedEmail = email.trim().toLowerCase();

    const atIndex = trimmedEmail.lastIndexOf('@');
    const domain = atIndex !== -1 ? trimmedEmail.slice(atIndex + 1) : '';

    this.isEmailValid =
      atIndex > 0 &&
      allowedDomains.includes(domain) &&
      trimmedEmail.endsWith('.com');
  }

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

  // navigate = () => {
  //   this.router.navigate(['/signin'], {
  //     queryParams: {
  //       countryCode: '',
  //       user: this.email.toLowerCase().trim(),
  //       type: 'Corporate',
  //     },
  //   });
  // };

  navigate = () => {
    this.router.navigate(['/signin'], {
      queryParams: {
        countryCode: this.countryCode,
        user: this.phoneNumber,
        type: 'Individual',
      },
    });
  };





}

