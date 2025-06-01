import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputComponent } from "../../utilities/input/input.component";
import { Signin } from '../../../resources/models/signin';

@Component({
  selector: 'app-setup-profile-form',
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: './setup-profile-form.component.html',
  styleUrl: './setup-profile-form.component.scss'
})
export class SetupProfileFormComponent {

  @Input() form!: FormGroup;
  @Output() validateUser: EventEmitter<any> = new EventEmitter<any>();
  @Output() getUser: EventEmitter<any> = new EventEmitter<any>();

  // user: Signin;
  // userType = 'phone';
  error: any = { type: '', message: '' };
  phoneNumber: any = '';

  loading = false;
  loading_ = false;
  success: any = {};

  countryCode = '+234';

  password: string = '';
  passwordType = 'password';
  showPassword = false;
  email: string = '';
  validators = {
    email: '',
    password: '',
    phoneNumber: ''
  };

  accountTypes = [
    {
      id: 1,
      type: 'Savings Account',
      icon: '../../../../assets/icons/savings.svg'
    },
    {
      id: 2,
      type: 'Current Account',
      icon: '../../../../assets/icons/current.svg'
    }
  ];

  handleChange = (
    name: 'phoneNumber' | 'password' | 'email',
    value: string
  ) => {
    console.log('handleChange', value)
    if (name === 'phoneNumber' && this.phoneNumber !== value) {
      this.showPassword = false;
      this.getUser.emit({ user: value, countryCode: this.countryCode });
    }
    if (name === 'phoneNumber')
      this[name] = value?.toString()?.replace(/[^0-9]/g, '');
    if (name === 'email') {
      this.showPassword = false;
      this[name] = value;
    } else this[name] = value;
    this.error = { type: '', message: '' };
    if (value && value === '') this.validators[name] = 'Required*';
    else this.validators[name] = '';
  };
}
