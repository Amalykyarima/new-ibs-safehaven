import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../resources/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CountdownComponent } from "../countdown/countdown.component";
import { OtpInputComponent } from "../otp-input/otp-input.component";
import { SharedDataService } from '../../../resources/services/shared-data.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, RouterModule, CountdownComponent, OtpInputComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {
  constructor(private authService: AuthService,
    private router: Router,
    private sharedDataService: SharedDataService,
  ) { }

  ngOnInit(): void {
    console.log(this.loginData);
  }

  pin = '';
  resendType = '';
  errorMessage = '';
  loading = false;
  @Input() showTimer = false;

  @Input() error = '';
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
              // (encoded);
              // this.router.navigate(['/onboarding/profile-setup/' + encoded]);
              // this.router.navigate(['/setup-account-corporate']);
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
    this.resendType = 'SMS'
    this.showTimer = true;
  };

  close_ = () => this.close.emit();

  clearCountDown = () => {
    this.showTimer = false
    this.resendType = ''
  }
}
