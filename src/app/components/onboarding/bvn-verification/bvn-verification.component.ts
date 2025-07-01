import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { SelectBoxComponent } from '../../../common/utilities/select-box/select-box.component';
import { InputComponent } from "../../../common/utilities/input/input.component";
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";
import { OtpInputComponent } from "../../../common/utilities/otp-input/otp-input.component";
import { CommonModule } from '@angular/common';
import { Store, State } from '@ngrx/store';
import { Router } from '@angular/router';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../resources/services/general.service';
import { IdentitiesService } from '../../../resources/services/identities.service';
import { CalendarComponent } from "../../../common/utilities/calendar/calendar.component";
import { timeout, catchError } from 'rxjs/operators';



import moment from 'moment';

@Component({
  selector: 'app-bvn-verification',
  standalone: true,
  imports: [CommonModule, SelectBoxComponent, InputComponent, ButtonFilledComponent, OtpInputComponent, CommonModule, CalendarComponent],
  templateUrl: './bvn-verification.component.html',
  styleUrl: './bvn-verification.component.scss',
})
export class BvnVerificationComponent {
  constructor(
    private router: Router,
    private identitiesService: IdentitiesService,
    private notification: NzNotificationService,
    private generalService: GeneralService
  ) { }
  error: any = { type: '', message: '' };
  pin = '';
  showOtpModal: boolean = false;

  isLoading: boolean = false;

  bvnValidationID: any = "";
  processLoading: boolean = false;
  errorMessage: string = "";
  @Input() smsDetails: any = {};
  @Output() showOtp: EventEmitter<any> = new EventEmitter<any>();
  @Input() value: string = '';
  @Output() onChange = new EventEmitter<string>();
  @Output() openFaceModal: EventEmitter<any> = new EventEmitter<any>();



  today: any = '';

  bvn: any = '';
  dateOfBirth: any = '01-01-1994';
  loading = false;
  // error = { type: '', message: '' };
  validators = {
    bvn: '',
    dateOfBirth: '',
  };

  verificationMethods: any = [
    { name: 'SMS', icon: '../../../../assets/icons/identity-sms.svg', activeIcon: '../../../../assets/icons/identity-sms-active.svg' },
    { name: 'USSD', icon: '../../../../assets/icons/identity-ussd.svg', activeIcon: '../../../../assets/icons/identity-ussd-active.svg' },
    { name: 'Face', icon: '../../../../assets/icons/identity-face.svg', activeIcon: '../../../../assets/icons/identity-face-active.svg' },
  ];
  activeMethod: string = '';
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date']) {
      this.date = moment(changes['date'].currentValue).format('YYYY-MM-DD');
    }
  }

  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  // @Input() error = '';
  @Input() className = '';
  @Input() date = moment(new Date().toDateString()).format('YYYY-MM-DD');
  @Output() setDate: EventEmitter<any> = new EventEmitter<any>();
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();


  visible = false;


  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['smsDetails']) {
  //     this.bvn = changes['smsDetails'].currentValue.bvn;
  //     this.dateOfBirth = changes['smsDetails'].currentValue.dateOfBirth;
  //   }
  // }

  ngOnInit(): void {
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];
  }

  sendBvnFace(){
    console.log('sendBvnFace')
    this.openFaceModal.emit();
  }


  setVerificationMethod(value: string) {
    this.activeMethod = value;
  }


  validateFormStep2 = () => {
    const err: any = {};
    if (this.bvn === '') err.address = 'Required*';
    if (this.dateOfBirth === '') err.state = 'Required*';

    if (Object.keys(err).length === 0) {
      this.isLoading = true;
    }

    return err;
  };

  handleChange = (name: 'bvn' | 'dateOfBirth', value: string) => {
    console.log('name handke', this.bvn)
    if (name === 'bvn') {
      this[name] = value;
      console.log('zzzzzzzzzzzzzzzz', this.bvn)
      // this.bvn = value;
    } else {
      this[name] = value;
    }
    // if (value === '') this.validators[name] = 'Required*';
    // else this.validators[name] = '';
  };


  handleSubmitStep2 = () => {
    console.log('handleSubmitStep2');

    if (Object.keys(this.validateFormStep2()).length > 0) {
      console.log(this.validateFormStep2());
      this.validators = { ...this.validators, ...this.validateFormStep2() };
    } else {
      this.submit.emit({
        stage: 2,
        data: {
          bvn: this.bvn,
          dateOfBirth: this.dateOfBirth,
        },
      });
    }

  };

  // handleChangeStep3 = (name: 'address' | 'state' | 'city', value: any) => {
  //   this[name] = value;
  //   if (value === '') {
  //     this.validators[name] = 'Required*';
  //   } else {
  //     this.validators[name] = '';
  //   }
  //   this.checkAllFieldsValid3()
  // };


  onDateChange = (event: any) => {
    // // // console.log(event);
    this.visible = false;
    this.date = moment(event).format('YYYY-MM-DD');
    this.setDate.emit(moment(event).format('YYYY-MM-DD'));
  };

  validateForm = () => {
    let err: any = {};
    if (!this.bvn || this.bvn === '') err.bvn = 'Required*';
    if (!this.dateOfBirth || this.dateOfBirth === '')
      err.dateOfBirth = 'Required*';
    return err;
  };


  getOTP() {
    console.log('innnn getOtp', this.bvn, this.dateOfBirth)
    // Only continue if process is not loading
    // if (this.processLoading) return;

    // this.errorMessage = "";
    // this.processLoading = true;

    // if ((this.bvn == "" || this.bvn == null)) {
    //   console.log(' empty getOtp')

    //   // this.generalService.showErrorMessage("All fields are required.");

    //   this.processLoading = false;
    // }
    // else {
    let data: any = {
      type: "BVN",
      method: "SMS",
      dateOfBirth: this.dateOfBirth,
      number: "" + this.bvn
    }
    console.log(data, 'data')

    this.identitiesService.SendOTP(data).pipe(timeout(30000)).subscribe(
      (res: any) => {
        console.log('SendOTP(data)', data)

        try {
          if (res.statusCode === 200) {
            console.log('SendOTP(data) 200 sucess')
            this.processLoading = false;
            this.bvnValidationID = res.data._id;
            // this.store.dispatch(
            //   onboardingActions.setValidationID({
            //     validationID: res.data._id,
            //   })
            // );
            // this.submitBVNStep = 2;
            // this.showOtpModal = true;
            // this.generalService.showSuccessMessage (res.message);
            this.generalService.changePINInputmode();
          }
          else {
            this.errorMessage = '' + res.message;
            this.processLoading = false;
          }
        }
        catch (e) { }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.processLoading = false;
      }
    )
  }

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

  sendBvnOTP() {
    const data = {
      type: 'BVN',
      method: 'SMS',
      dateOfBirth: this.dateOfBirth,
      number: '' + this.bvn  // ensures it's treated as a string
    };

    if(this.activeMethod === 'USSD'){

    }

    console.log('dataaa', data)

    this.identitiesService.SendOTP(data)
      .pipe(timeout(30000))
      .subscribe({
        next: (res: any) => {
          try {
            if (res.statusCode === 200) {
              console.log('OTP sent successfully:', res);

              this.processLoading = false;
              this.bvnValidationID = res.data._id;
              // this.submitBVNStep = 2;
              // this.showOtpModal = true;
              this.generalService.showSuccessMessage(res.message);
              this.generalService.changePINInputmode();
            }
            else {
              console.log('OTP not successfully:', res);

              this.setVerificationMethod('USSD');
              this.errorMessage = '' + res.message;
              this.processLoading = false;
            }
          }
          catch (e) { }
        },
        error: (err: any) => {
          console.error('Error sending OTP:', err);
          // Handle timeout or failure
        }
      });
  }

  verifyOtp = () => {
    if (this.pin.length !== 6) this.error = 'Required*';
    else {
      const data = {
        otp: this.pin,
      };
      this.loading = true;
      this.identitiesService.VerifyOTP(data, this.bvnValidationID)
        .subscribe({
          next: (res: any) => {
            this.loading = false;
            if (res.statusCode === 200) {
              this.generalService.saveUser(res.data)
              this.generalService.goToDashboard();

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
    // this.validate.emit('this.pin');
  };

  validateOTP() {
    // const data = {
    //   otp: this.otp,
    // };
    // Only continue if process is not loading
    // if (this.processLoading) return;

    // this.errorMessage = '';
    // this.processLoading = true;
    // if (this.toggleOTPForm && this.otp.length != 6) {
    //     this.errorMessage = "Invalid OTP";
    //     this.processLoading = false;
    // }
    // else if (!this.toggleOTPForm && [this.phoneNumber, this.firstName].includes("")) {
    //     this.errorMessage = "All fields are required.";
    //     this.processLoading = false;
    // }
    // else {
    //     let data: any;
    //     // OTP
    //     if (this.toggleOTPForm) {
    //         data = {
    //             otp: this.otp,
    //         }
    //         this.identitiesService.VerifyOTP(data, this.bvnValidationID).subscribe(
    //             (res: any) => {
    //                 if (res.statusCode === 200) {
    //                     this.processLoading = false;
    //                     this.submitBVN();
    //                 }
    //                 else {
    //                     this.errorMessage = '' + res.message;
    //                     this.processLoading = false;
    //                 }
    //             },
    //             (error: any) => {
    //                 this.errorMessage = 'An error occured. Please try again later';
    //                 this.processLoading = false;
    //             }
    //         )
    //     }
    //     // 2FA
    //     else {
    //         data = {
    //             phoneNumber: this.phoneNumber,
    //             firstName: this.firstName
    //         }
    //         this.identitiesService.Verify2FA(data, this.bvnValidationID).subscribe(
    //             (res: any) => {
    //                 if (res.statusCode === 200) {
    //                     this.processLoading = false;
    //                     this.submitBVN();
    //                 }
    //                 else {
    //                     this.errorMessage = '' + res.message;
    //                     this.processLoading = false;
    //                 }
    //             },
    //             (error: any) => {
    //                 this.errorMessage = 'An error occured. Please try again later';
    //                 this.processLoading = false;
    //             }
    //         )
    //     }
    // }
  }


}

