import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule,  } from '@angular/router';
import { SetupProfileFormComponent } from "../../components/onboarding/setup-profile-form/setup-profile-form.component";
import { ButtonFilledComponent } from "../../common/utilities/button-filled/button-filled.component";

@Component({
  selector: 'app-create-account-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SetupProfileFormComponent, ButtonFilledComponent],
  templateUrl: './create-account-layout.component.html',
  styleUrl: './create-account-layout.component.scss'
})
export class CreateAccountLayoutComponent {

  form: FormGroup;

  accountTypes = [
    {
      id: 1,
      type: 'Savings Account',
      icon: '/account-avatar.svg'
    },
    {
      id: 2,
      type: 'Current Account',
      icon: '/account-avatar-1.svg'
    }
  ];

  navigationSteps = [
    { label: 'Additional Information', status: 'completed' },
    { label: 'Home Address', status: 'active' },
    { label: 'Password Setup', status: 'default' }
  ];

  currentFlags = {
    additional: false,
    home: true,
    passwordSetup: false
  };



  // navigationSteps = [
  //   { id: 1, label: 'Additional Information', active: true },
  //   { id: 2, label: 'Home Address', active: false },
  //   { id: 3, label: 'Password Setup', active: false }
  // ];
  spinner: boolean = false;
  loading: boolean = false

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [''],
      gender: [''],
      accountType: ['']
    });
  }

  // activateStep(index: number): void {
  //   this.navigationSteps = this.navigationSteps.map((step, i) => {
  //     if (i < index) {
  //       return { ...step, status: 'completed' };
  //     } else if (i === index) {
  //       return { ...step, status: 'active' };
  //     } else {
  //       return { ...step, status: 'default' };
  //     }
  //   });
  // }
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
      passwordSetup: index === 2
    };
  }

}
