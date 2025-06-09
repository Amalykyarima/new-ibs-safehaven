import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';


@Component({
  selector: 'app-totp-register',
  standalone: true,
  imports: [CommonModule, NgOtpInputModule],
  templateUrl: './totp-register.component.html',
  styleUrl: './totp-register.component.scss'
})
export class TotpRegisterComponent {
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
    // this.pin = event;
    // if (event.length == 4) {
    //   this.twoFactorAction == 'signin' ? this.verify('PIN') : this.enrol('PIN');
    // }
  }
}
