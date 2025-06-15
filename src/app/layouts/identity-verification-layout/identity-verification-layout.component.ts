import { Component, inject } from '@angular/core';
import { TabComponent } from '../../common/utilities/tab/tab.component';
import { CommonModule } from '@angular/common';
import { BvnVerificationComponent } from '../../components/onboarding/bvn-verification/bvn-verification.component';
import { NinVerificationComponent } from '../../components/onboarding/nin-verification/nin-verification.component';
import { DisplayStore } from '../../stores/display.store';
import { ModalComponent } from '../../common/utilities/modal/modal.component';
import { ButtonFilledComponent } from '../../common/utilities/button-filled/button-filled.component';

@Component({
  selector: 'app-identity-verification-layout',
  standalone: true,
  imports: [
    TabComponent,
    CommonModule,
    BvnVerificationComponent,
    NinVerificationComponent,
    ModalComponent,
    ButtonFilledComponent,
  ],
  templateUrl: './identity-verification-layout.component.html',
  styleUrl: './identity-verification-layout.component.scss',
})
export class IdentityVerificationLayoutComponent {
  verificationTypes: string[] = ['BVN', 'NIN'];
  activeType: string = 'BVN';
  animate: boolean = false;
  readonly store = inject(DisplayStore);
  openModal() {
    this.store.updateModalView('user-info', 'modal');
  }
  switchTab = (value: string) => {
    this.activeType = value;
  };
}
