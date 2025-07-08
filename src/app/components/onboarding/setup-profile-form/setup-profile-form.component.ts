import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputComponent } from "../../../common/utilities/input/input.component";
import { Signin } from '../../../resources/models/signin';
import { SelectComponent } from "../../../common/utilities/select/select.component";
import { SmallButtonComponent } from "../../../common/utilities/small-button/small-button.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-setup-profile-form',
  standalone: true,
  imports: [CommonModule, InputComponent, SelectComponent, SmallButtonComponent, RouterModule],
  templateUrl: './setup-profile-form.component.html',
  styleUrl: './setup-profile-form.component.scss'
})
export class SetupProfileFormComponent {
// additional: boolean = false;
// home:  boolean = true;
// passwordSetup: boolean = false;
@Input() additional: boolean = false;
@Input() home: boolean = true;
@Input() passwordSetup: boolean = false;
@Input() inputSpinner: boolean = false;


spinner: boolean = false;

constructor(
  private router: Router,
) {
}

onClick() {
  this.active = !this.active;
}
saveData() {
throw new Error('Method not implemented.');
}
onCountrySelected($event: string) {
throw new Error('Method not implemented.');
}
active: boolean = false;

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
  address: string = '';
  validators = {
    email: '',
    password: '',
    phoneNumber: '',
    address:'',
  };
  // icon-active: '../../../../assets/icons/savings-active.svg',

  accountTypes = [
    {
      id: 1,
      type: 'Savings Account',
      icon: '../../../../assets/icons/savings.svg',
      active: '../../../../assets/icons/savings-active.svg',
    },
    {
      id: 2,
      type: 'Current Account',
      icon: '../../../../assets/icons/current.svg',
      active: '../../../../assets/icons/current-active.svg'

    }
  ];

  onBack(): void {
    if (this.additional) {
      // Case: First screen — go to home page
      this.router.navigate(['/home']); // adjust this path as needed
    } else if (this.home) {
      // Case: Second screen — go back to 'additional'
      this.additional = true;
      this.home = false;
      this.passwordSetup = false;
    } else if (this.passwordSetup) {
      // Case: Third screen — go back to 'home'
      this.additional = false;
      this.home = true;
      this.passwordSetup = false;
    }
  }


  handleChange = (
    name: 'phoneNumber' | 'password' | 'email' | 'address',
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
