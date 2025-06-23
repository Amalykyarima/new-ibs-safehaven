import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
// import { Router } from 'react-router-dom';
import { AuthService } from '../../../resources/services/auth.service';
import { Router } from '@angular/router';
import { CountdownComponent } from '../../../common/utilities/countdown/countdown.component';
import { SharedDataService } from '../../../resources/services/shared-data.service';
import { MaskMiddlePipe } from '../../../resources/services/mask.pipe';


@Component({
  selector: 'app-totp-register',
  standalone: true,
  imports: [CommonModule, NgOtpInputModule, CountdownComponent, MaskMiddlePipe],
  templateUrl: './totp-register.component.html',
  styleUrl: './totp-register.component.scss'
})
export class TotpRegisterComponent {
  userType = 'phone';
  error: any = { type: '', message: '' };
  phoneNumber: any = '';

  loading = false;
  loading_ = false;
  success: any = {};
  constructor(private authService: AuthService,
    private router: Router,
    private sharedDataService: SharedDataService,
    ) {}

  pinConfig = {
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

  onPINChange(event: any) {
    console.log(event, 'onPinChnage')
    this.error = '';
    this.pin = event;
    // //(event);
    console.log(event);
    this.errorMessage = '';
    if (this.pin.length === 6) {
      // this.validate.emit('this.pin');
      this.verifyOtp();
    }
  }

  ngOnInit(): void {
    console.log(this.loginData);
  }

  pin = '';
  resendType = '';
  errorMessage = '';
  @Input() showTimer = false;

  @Input() loginData: any = {};
  @Input() hideBackBtn: boolean = false;
  @Output() validate: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() resend: EventEmitter<any> = new EventEmitter<any>();

  verifyOtp = () => {
    // this.error = 'Invalid otp';
    //('click', this.loginData);
    if (this.pin.length !== 6) this.error = 'Required*';
    else {
      this.loading = true;
      this.authService
        .validateNewUserOtp(this.loginData._id, {
          otp: this.pin,
        })
        .subscribe({
          next: (res: any) => {
            this.loading = false;
            if (res.statusCode === 200) {
              const encoded = window.btoa(JSON.stringify(this.loginData));
              //(encoded);
              // this.router.navigate(['/onboarding/profile-setup/' + encoded]);

            console.log('logindataaa', this.loginData)
            this.sharedDataService.setLoginData(this.loginData);

              if (this.loginData.accountType === 'Corporate'){
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
            this.loading = false;
            this.errorMessage = 'Something went wrong, please try again';
            this.error = 'Something went wrong, please try again';
          },
        });
    }
    this.validate.emit('this.pin');
  };
  onPinChange = (event: any) => {
    this.error = '';
    this.pin = event;
    // //(event);
    console.log(event);
    this.errorMessage = '';
    if (this.pin.length === 6) {
      this.validate.emit('this.pin');
      this.verifyOtp();
    }
  };
  resendOtp = (type: 'SMS' | 'VOICE' = 'SMS') => {
    this.resend.emit(type);
    this.resendType ='SMS'
    this.showTimer = true;
  };


  close_ = () => this.close.emit();

  clearCountDown = ()=>{
    this.showTimer = false
    this.resendType =''
  }
}

