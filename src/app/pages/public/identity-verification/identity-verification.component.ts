import { Component } from '@angular/core';
import { TabComponent } from '../../../common/utilities/tab/tab.component';
import { CommonModule } from '@angular/common';
import { BvnVerificationComponent } from "../../../common/layout/bvn-verification/bvn-verification.component";
import { NinVerificationComponent } from "../../../common/layout/nin-verification/nin-verification.component";

@Component({
  selector: 'app-identity-verification',
  standalone: true,
  imports: [TabComponent, CommonModule, BvnVerificationComponent, NinVerificationComponent],
  templateUrl: './identity-verification.component.html',
  styleUrl: './identity-verification.component.scss',
})
export class IdentityVerificationComponent {
  verificationTypes: string[] = ['BVN', 'NIN'];
  activeType: string = 'BVN';
  animate: boolean = false;

  switchTab = (value: string) => {
    this.activeType = value;
  };
}
