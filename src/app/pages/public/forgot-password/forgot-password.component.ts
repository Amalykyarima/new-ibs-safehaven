import { Component, Input, OnInit } from '@angular/core';
import { InputComponent } from "../../../common/utilities/input/input.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,InputComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
  error: any = { type: '', message: '' };
  phoneNumber: any = '';
  email: any = '';
  password: any = '';
  confirmPassword: any = '';
  showPassword = false;
  countryCode = '+234'
  validators = {
    email: '',
    password: '',
    phoneNumber: '',
    confirmPassword: '',
  };
  getCountryCode = (code: any) => {
    this.countryCode = code;
  };
  @Input() accountType: 'Individual' | 'Corporate' = 'Individual';

  handleChange = (
    name: 'email' | 'password' | 'phoneNumber' | 'confirmPassword',
    value: string
  ) => {
    if (name === 'email' && this.email !== value) this.showPassword = false;
    this[name] = value;
    if (value === '') this.validators[name] = 'Required*';
    else this.validators[name] = '';
  };
}
