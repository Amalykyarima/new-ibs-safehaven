import { Component, inject } from '@angular/core';
import { SelectBoxComponent } from '../../utilities/select-box/select-box.component';
import { InputComponent } from "../../utilities/input/input.component";
import { ButtonFilledComponent } from "../../utilities/button-filled/button-filled.component";
import { OtpInputComponent } from "../../utilities/otp-input/otp-input.component";
import { CommonModule } from '@angular/common';
import { DisplayStore } from '../../../stores/display.store';
import { ModalComponent } from '../../utilities/modal/modal.component';

@Component({
  selector: 'app-bvn-verification',
  standalone: true,
  imports: [SelectBoxComponent, InputComponent, ButtonFilledComponent, OtpInputComponent, CommonModule, ModalComponent],
  templateUrl: './bvn-verification.component.html',
  styleUrl: './bvn-verification.component.scss',
})
export class BvnVerificationComponent {
  verificationMethods: any = [
    { name: 'SMS', icon: '../../../../assets/icons/identity-sms.svg', activeIcon: '../../../../assets/icons/identity-sms-active.svg' },
    { name: 'USSD', icon: '../../../../assets/icons/identity-ussd.svg', activeIcon: '../../../../assets/icons/identity-ussd-active.svg' },
    { name: 'Face', icon: '../../../../assets/icons/identity-face.svg', activeIcon: '../../../../assets/icons/identity-face-active.svg' },
  ];
  loading: boolean = false
  activeMethod: string = 'SMS';
  constructor() {}
  readonly store = inject(DisplayStore);
  openModal() {
    this.store.updateModalView('user-info', 'modal');
  }

  setVerificationMethod(value: string) {
    this.activeMethod = value;
  }
  verifyBVN() {
    
  }
}
