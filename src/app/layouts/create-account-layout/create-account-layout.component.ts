import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SetupProfileFormComponent } from "../../common/layout/setup-profile-form/setup-profile-form.component";

@Component({
  selector: 'app-create-account-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, SetupProfileFormComponent],
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
    { id: 1, label: 'Additional Information', active: true },
    { id: 2, label: 'Home Address', active: false },
    { id: 3, label: 'Password Setup', active: false }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [''],
      gender: [''],
      accountType: ['']
    });
  }
}
