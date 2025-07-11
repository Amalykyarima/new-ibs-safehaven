import { Component, computed, inject } from '@angular/core';
import { TabComponent } from '../../common/utilities/tab/tab.component';
import { CommonModule } from '@angular/common';
import { BvnVerificationComponent } from '../../components/onboarding/bvn-verification/bvn-verification.component';
import { NinVerificationComponent } from '../../components/onboarding/nin-verification/nin-verification.component';
import { DisplayStore } from '../../stores/display.store';
import { ModalComponent } from '../../common/utilities/modal/modal.component';
import { ButtonFilledComponent } from '../../common/utilities/button-filled/button-filled.component';
import { OtpComponent } from "../../common/utilities/otp/otp.component";
import { FaceVerificationComponent } from "../../components/modals/face-verification/face-verification.component";

@Component({
  selector: 'app-identity-verification-layout',
  standalone: true,
  imports: [
    CommonModule,
    TabComponent,
    BvnVerificationComponent,
    NinVerificationComponent,
    ModalComponent,
    OtpComponent,
    FaceVerificationComponent
],
  templateUrl: './identity-verification-layout.component.html',
  styleUrl: './identity-verification-layout.component.scss',
})
export class IdentityVerificationLayoutComponent {
  verificationTypes: string[] = ['BVN', 'NIN'];
  activeType: string = 'BVN';
  animate: boolean = false;
  readonly store = inject(DisplayStore);
ShowOtpForBvn: boolean = false;
  openModal() {
    console.log('OpenFaceModal')
   this.store.openModal('face-verification')
  }
  switchTab = (value: string) => {
    this.activeType = value;
  };
    activeModal = computed(() => {
      const modals = this.store.modals();
      return Object.keys(modals).find((key) => modals[key]);
    });
}
