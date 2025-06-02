import { Component } from '@angular/core';
import { TabComponent } from '../../common/utilities/tab/tab.component';
import { CommonModule } from '@angular/common';
import { BvnVerificationComponent } from '../../common/layout/bvn-verification/bvn-verification.component';
import { NinVerificationComponent } from '../../common/layout/nin-verification/nin-verification.component';

@Component({
  selector: 'app-identity-verification-layout',
  standalone: true,
  imports: [TabComponent, CommonModule, BvnVerificationComponent, NinVerificationComponent],
  templateUrl: './identity-verification-layout.component.html',
  styleUrl: './identity-verification-layout.component.scss'
})
export class IdentityVerificationLayoutComponent {
  verificationTypes: string[] = ['BVN', 'NIN'];
  activeType: string = 'BVN';
  animate: boolean = false;

  switchTab = (value: string) => {
    this.activeType = value;
  };
}
