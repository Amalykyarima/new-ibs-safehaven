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

@Component({
  selector: 'app-bvn-verification',
  standalone: true,
  imports: [SelectBoxComponent, InputComponent, ButtonFilledComponent, OtpInputComponent, CommonModule],
  templateUrl: './bvn-verification.component.html',
  styleUrl: './bvn-verification.component.scss',
})
export class BvnVerificationComponent {
  constructor(
    private router: Router,
    private identityService: IdentitiesService,
    // private store: Store<State>,
    private notification: NzNotificationService,
    private generalService: GeneralService
  ) {}

  @Input() smsDetails: any = {};
  @Output() showOtp: EventEmitter<any> = new EventEmitter<any>();

  today: any = '';

  bvn = '';
  dateOfBirth = '';
  loading = false;
  error = { type: '', message: '' };
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
    if (changes['smsDetails']) {
      this.bvn = changes['smsDetails'].currentValue.bvn;
      this.dateOfBirth = changes['smsDetails'].currentValue.dateOfBirth;
    }
  }

  ngOnInit(): void {
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];
  }


  setVerificationMethod(value: string) {
    this.activeMethod = value;
  }
  verifyBVN() {

  }

  handleChange = (name: 'bvn' | 'dateOfBirth', value: string) => {
    this[name] = value;
    if (value === '') this.validators[name] = 'Required*';
    else this.validators[name] = '';
  };

  validateForm = () => {
    let err: any = {};
    if (!this.bvn || this.bvn === '') err.bvn = 'Required*';
    if (!this.dateOfBirth || this.dateOfBirth === '')
      err.dateOfBirth = 'Required*';
    return err;
  };
  validateBvn = () => {
    // //(this.validateForm());
    if (Object.keys(this.validateForm()).length > 0) {
      this.validators = { ...this.validators, ...this.validateForm() };
    } else {
      this.loading = true;
      this.identityService
        .newIdentityService({
          type: 'BVN', //BVN, NIN, vNIN, vBVN, NIN-FACE, BVN-FACE
          dateOfBirth: this.dateOfBirth,
          method: 'SMS', //SMS or VOICE
          number: this.bvn,
          // otp: '', //For vBVN
          image: '',
        })
        .subscribe({
          next: (res: any) => {
            // //(res);
            this.loading = false;
            if (
              (res.statusCode === 200 || res.statusCode === 201) &&
              res.message === 'Registration Successful.'
            ) {
              // this.store.dispatch(
              //   onboardingActions.setSignInDetails({
              //     signInDetails: { ...res.data.user },
              //   })
              // );
              // (res.data);
              // this.store.dispatch(
              //   onboardingActions.setTempUserDetails({
              //     tempUser: {
              //       ...res.data,
              //     },
              //   })
              // );

              this.generalService.saveUser(res.data);
              // this.store.dispatch(
              //   onboardingActions.setTwoFAAction({ twoFAType: 'signup' })
              // );
              this.notification.success(
                'BVN validated successfully.',
                '' + res.message,
                { nzClass: 'notification1' }
              );

              setTimeout(() => {
                this.router.navigate(['/signin/two-factor-authentication']);
              }, 500);
            } else if (
              (res.statusCode === 200 || res.statusCode === 201) &&
              res.validationRequired
            ) {
              this.showOtp.emit({
                type: 'BVN',
                method: 'SMS',
                bvn: this.bvn,
                dateOfBirth: this.dateOfBirth,
                ...res.data,
                customMessage: res.message,
              });
            } else {
              this.error = { type: '', message: res.message };
            }
          },
          error: (err: any) => {
            this.loading = false;
            this.error = {
              type: '',
              message: 'Something went wrong, please try again,',
            };
          },
        });
    }
  };
}
