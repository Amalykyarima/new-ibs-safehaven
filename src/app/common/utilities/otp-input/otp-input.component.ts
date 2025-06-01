import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AfterViewInit,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';


@Component({
  selector: 'app-otp-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgOtpInputModule, RouterModule],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.scss'
})
export class OtpInputComponent implements OnInit, OnChanges {
  @Input() length: number = 6;
  @Input() error = '';
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  pinConfig: any = {};

  ngOnInit(): void {
    this.initializePinConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['error']) {
      if (this.error !== '') {
        this.initializePinConfig(true);
        setTimeout(() => {
          this.error = '';
        }, 1000);
      } else {
        this.initializePinConfig(false);
      }
    }
  }

  initializePinConfig(hasError: boolean = false) {
    this.pinConfig = {
      length: this.length,
      disableAutoFocus: true,
      allowNumbersOnly: true,
      isPasswordInput: true,
      inputClass: 'border-none',
      containerClass:
        'flex items-center sm:gap-[20px] gap-[14px] justify-between w-full',
      inputStyles: {
        'min-height': '52px',
        'min-width': '42px',
        background: '#F4F5F7',
        'border-radius': '10px',
        color: hasError ? 'red' : '#034EA2',
        border: hasError ? '1px solid red' : 'none',
      },
    };
  }

  ngAfterViewInit() {
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach((input) => {
      input.addEventListener('paste', (e) => this.handlePaste(e));
    });
  }

  onPINChange = (event: any) => {
    if (event.length === this.length) {
      this.pinConfig.inputStyles.color = '#034EA2';
      this.pinConfig.inputStyles.border = 'none';
      this.onChange.emit(event);
    }
  };

  handlePaste(event: any) {
    const clipboardData = event?.clipboardData;
    const pastedData = clipboardData?.getData('text');
    const otpInputs = Array.from(
      document.querySelectorAll('.otp-input')
    ) as HTMLInputElement[];

    let val = pastedData.slice(0, this.length);
    for (let i = 0; i < val.length; i++) {
      otpInputs[i].value = val[i];
    }
    event.preventDefault();
    this.onChange.emit(val);
  }
}

// export class OtpInputComponent {
//   @Input() length: number = 6;
//   @Input() error = '';
//   @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  
//   constructor() {
//     this.pinConfig = {
//       length: this.length,
//       disableAutoFocus: true,
//       allowNumbersOnly: true,
//       isPasswordInput: true,
//       inputClass: 'border-none',
//       containerClass:
//         'flex items-center sm:gap-[20px] gap-[14px] justify-between w-full',
//       inputStyles: {
//         'min-height': '52px',
//         border: 'none',
//         'min-width': '42px',
//         background: '#F4F5F7',
//         'border-radius': '10px',
//         color: '#034EA2',
//       },
//     };
//   }
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['error'] && changes['error'].currentValue !== '') {
//       this.pinConfig = {
//         length: this.length,
//         disableAutoFocus: true,
//         allowNumbersOnly: true,
//         isPasswordInput: true,
//         inputClass: 'border-none',
//         containerClass: 'flex items-center gap-[20px] justify-between  w-full',
//         inputStyles: {
//           'min-height': '52px',
//           'min-width': '42px',
//           border: '1px solid red',
//           background: '#F4F5F7',
//           'border-radius': '10px',
//           color: 'red',
//         },
//       };
//       setTimeout(() => {
//         this.error = '';
//       }, 1000);
//     } else if (changes['error'] && changes['error'].currentValue === '') {
//       this.pinConfig = {
//         length: this.length,
//         disableAutoFocus: true,
//         allowNumbersOnly: true,
//         isPasswordInput: true,
//         inputClass: 'border-none',
//         containerClass: 'flex items-center gap-[20px] justify-between  w-full',
//         inputStyles: {
//           'min-height': '52px',
//           border: 'none',
//           'min-width': '42px',
//           background: '#F4F5F7',
//           'border-radius': '10px',
//           color: '#034EA2',
//         },
//       };
//     }
//   }

//   ngOnInit(): void {}

//   ngAfterViewInit() {
//     const otpInputs = document.querySelectorAll('.otp-input');
//     otpInputs.forEach((input) => {
//       input.addEventListener('paste', (e) => this.handlePaste(e));
//     });
//   }


//   pinConfig: any = {};

//   onPINChange = (event: any) => {
//     if (event.length === this.length) {
//       this.pinConfig.inputStyles.color = '#034EA2';
//       this.pinConfig.inputStyles.border = 'none';
//       // //(event);
//       this.onChange.emit(event);
//     }
//   };

//   handlePaste(event: any) {
//     const clipboardData = event?.clipboardData;
//     const pastedData = clipboardData?.getData('text');
//     const otpInputs = Array.from(
//       document.querySelectorAll('.otp-input')
//     ) as HTMLInputElement[];

//     let val = pastedData.slice(0, this.length);

//     let l = val.length >= this.length ? this.length : val.length;
//     for (let i = 0; i < l; i++) {
//       otpInputs[i].value = val[i];
//     }
//     event.preventDefault();
//     this.onChange.emit(val);
//   }
// }
