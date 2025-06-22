import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SetupProfileFormComponent } from '../../components/onboarding/setup-profile-form/setup-profile-form.component';
import { ButtonFilledComponent } from '../../common/utilities/button-filled/button-filled.component';
import { SetupProfileCorporateComponent } from "../../common/layout/setup-profile-corporate/setup-profile-corporate.component";
import { SetupProfileIndividualComponent } from "../../common/layout/setup-profile-individual/setup-profile-individual.component";
import { SharedDataService } from '../../resources/services/shared-data.service';
import { OnboardingLayoutComponent } from "../onboarding-layout/onboarding-layout.component";

@Component({
  selector: 'app-create-account-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    SetupProfileFormComponent,
    ButtonFilledComponent,
    SetupProfileCorporateComponent,
    SetupProfileIndividualComponent,
    OnboardingLayoutComponent
],
  templateUrl: './create-account-layout.component.html',
  styleUrl: './create-account-layout.component.scss',
})
export class CreateAccountLayoutComponent {
  form: FormGroup;
  corporateForm: any = {};
  individualForm: any = {};
  corporateSteps: string[] = ['Company Details', 'Company Address', 'Directors Address', 'Password Setup'];
  individualSteps: string[] = ['Additional Information', 'Home Address', 'Password Setup'];
  activeStep: number = 0;
  accountTypes = [
    {
      id: 1,
      type: 'Savings Account',
      icon: '/account-avatar.svg',
    },
    {
      id: 2,
      type: 'Current Account',
      icon: '/account-avatar-1.svg',
    },
  ];

  navigationSteps = [
    { label: 'Additional Information', status: 'completed' },
    { label: 'Home Address', status: 'active' },
    { label: 'Password Setup', status: 'default' },
  ];

  currentFlags = {
    additional: false,
    home: true,
    passwordSetup: false,
  };

  spinner: boolean = false;
  loading: boolean = false;
  loginData: any;
accountOpened: boolean = false;


    constructor(private fb: FormBuilder,
      private sharedDataService: SharedDataService,) {
    this.form = this.fb.group({
      email: [''],
      gender: [''],
      accountType: [''],
    });
  }

  ngOnInit(){
    this.loginData = this.sharedDataService.getLoginData();
  }


  setStep(step: number) {
    this.activeStep = step;
  }

  updateStep(step: number) {
    this.activeStep = step;
  }
  activateStep(index: number): void {
    this.navigationSteps = this.navigationSteps.map((step, i) => {
      if (i < index) {
        return { ...step, status: 'completed' };
      } else if (i === index) {
        return { ...step, status: 'active' };
      } else {
        return { ...step, status: 'default' };
      }
    });

    // Toggle flags based on current step
    this.currentFlags = {
      additional: index === 0,
      home: index === 1,
      passwordSetup: index === 2,
    };
  }

  // Add these methods to handle events from child component
handleSpinnerChange(showSpinner: boolean) {
  this.spinner = showSpinner;
}

handleAccountOpenedChange(isOpened: boolean) {
  this.accountOpened = isOpened;
}
}
