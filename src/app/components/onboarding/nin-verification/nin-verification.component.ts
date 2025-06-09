import { Component } from '@angular/core';
import { SelectBoxComponent } from "../../../common/utilities/select-box/select-box.component";
import { InputComponent } from "../../../common/utilities/input/input.component";
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nin-verification',
  standalone: true,
  imports: [SelectBoxComponent, InputComponent, ButtonFilledComponent, CommonModule],
  templateUrl: './nin-verification.component.html',
  styleUrl: './nin-verification.component.scss'
})
export class NinVerificationComponent {
  verificationMethods: any = [
    { name: 'SMS', icon: '../../../../assets/icons/identity-sms.svg', activeIcon: '../../../../assets/icons/identity-sms-active.svg' },
    { name: 'Face', icon: '../../../../assets/icons/identity-face.svg', activeIcon: '../../../../assets/icons/identity-face-active.svg' },
  ];
  loading: boolean = false
  activeMethod: string = '';


  setVerificationMethod(value: string) {
    this.activeMethod = value;
  }
  verifyNIN() {

  }
}
