import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { getStates, getLgas } from 'ngn-states-lgas';


// import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchComponent } from "../../utilities/search/search.component";
import { InputComponent } from "../../utilities/input/input.component";
import { DatepickerComponent } from "../../utilities/datepicker/datepicker.component";
import { SelectComponent } from "../../utilities/select/select.component";
import { ButtonFilledComponent } from "../../utilities/button-filled/button-filled.component";
import { IdentitiesService } from '../../../resources/services/identities.service';

@Component({
  selector: 'app-setup-profile-corporate',
  standalone: true,
  imports: [CommonModule, SearchComponent, InputComponent, DatepickerComponent, SelectComponent, ButtonFilledComponent],
  templateUrl: './setup-profile-corporate.component.html',
  styleUrl: './setup-profile-corporate.component.scss'
})
export class SetupProfileCorporateComponent {
  constructor(private identityService: IdentitiesService) {}

  states: any[] = [];
  address = '';
  state = '';
  city = '';
  passwordType1 = 'password'
  passwordType2 = 'password'
  password = '';
  confirmPassword = '';

  // validators = {

  // };

  get charactersLengthCheck() {
    return this.password.length >= 8;
  }

  get uppercaseCheck() {
    return /[A-Z]/.test(this.password);
  }

  get lowercaseCheck() {
    return /[a-z]/.test(this.password);
  }

  get numberCheck() {
    return /[0-9]/.test(this.password);
  }

  get specialCharacterCheck() {
    return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.password);
  }

  get passwordIsStrong() {
    return (
      this.charactersLengthCheck &&
      this.uppercaseCheck &&
      this.lowercaseCheck &&
      this.numberCheck &&
      this.specialCharacterCheck
    );
  }
  // validators = {

  // };
  businessTypes = [
    'Agric Business',
    'Contracting',
    'Financial Institutions',
    'Health Care',
    'Hospitality',
    'Lottery and Games',
    'Manufacturing',
    'NGOs',
    'Associations and Clubs',
    'Professional Practice Firms',
    'Religious Bodies',
    'Retail Trade',
    'Schools',
    'Supply',
    'Wholesale Trade',
    'Technology',
    'Creative and Art Industry',
    'Others',
  ];
  today: any = '';
  companyName = '';
  registrationNumber = '';
  registrationDate = '';
  registrationType = '';
  natureOfBusiness = '';
  tin = '';
  accountType = 'Current';

  showForm = true;
  search = '';
  searching = false;

  validators = {
    companyName: '',
    registrationNumber: '',
    registrationDate: '',
    registrationType: '',
    natureOfBusiness: '',
    tin: '',
    accountType: '',
    address: '',
    state: '',
    city: '',
    password: '',
    confirmPassword: '',
  };

  searchResults: any = [];
  showSearch = false;

  @Input() form: any = {};
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  @Input() step = 0;
  @Input() totalSteps = 0;
  @Output() stepChange = new EventEmitter<number>();
  searchCompany: boolean = true;



  ngOnInit(): void {
    this.states = getStates();
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form'] && changes['form'].currentValue.companyName) {
      //(changes['form'].currentValue);
      this.companyName = changes['form'].currentValue.companyName;
      this.registrationNumber = changes['form'].currentValue.registrationNumber;
      this.registrationDate = changes['form'].currentValue.registrationDate;
      this.registrationType = changes['form'].currentValue.registrationType;
      this.natureOfBusiness = changes['form'].currentValue.natureOfBusiness;
      this.tin = changes['form'].currentValue.tin;
      this.accountType = changes['form'].currentValue.accountType;
      this.showForm = true;
    }else  if (changes['form']) {
      //("changes['form'].currentValue", changes['form'].currentValue);
      this.state = changes['form'].currentValue.state;
      this.address = changes['form'].currentValue.address;
      this.city = changes['form'].currentValue.city;
    }
  }

  getLGAS = (state: string = '') => {
    return state === '' ? [] : getLgas(state);
  };

  nextt(){
    this.searchCompany = !this.searchCompany
  }



  searchCompanyToggle() {
    this.searching = true;
    this.showSearch = false;
    this.identityService.searchCompany({ filter: this.search }).subscribe({
      next: (res: any) => {
        //(res);
        this.searching = false;
        this.searchResults = res.data;
        this.showSearch = true;
      },
      error: (err) => {
        this.searching = false;
      },
    });
  }

  next=()=> {
    if (this.step < this.totalSteps - 1) {
      this.stepChange.emit(this.step + 1);
    }
  }

  back() {
    if (this.step > 0) {
      this.stepChange.emit(this.step - 1);
    }
  }

  validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  handleChange = (
    name:
      | 'companyName'
      | 'registrationNumber'
      | 'registrationDate'
      | 'natureOfBusiness'
      | 'registrationType'
      | 'tin'
      | 'accountType',
    value: any
  ) => {
    // //(value);
    if (name === 'companyName') {
      let regex = /[^a-zA-Z0-9 .,'&,@-]/g;
      this[name] = value.replace(regex, '').replaceAll('&', ' And ');
    } else this[name] = value;

    if (value === '' && name !== 'tin') this.validators[name] = 'Required*';
    else this.validators[name] = '';
  };

  handleChange1 = (name: 'address' | 'state' | 'city', value: any) => {
    // console.log(name, value);
    this[name] = value;
    if (value === '') this.validators[name] = 'Required*';
    else this.validators[name] = '';
  };

  handleChange2 = (name: 'password' | 'confirmPassword', value: any) => {
    this[name] = value;
    if (value === '') this.validators[name] = 'Required*';
    else if (name === 'password' && !this.passwordIsStrong)
      this.validators[name] = 'Password is weak*';
    else if (name === 'confirmPassword' && this.password !== value)
      this.validators[name] = 'Passwords do not match*';
    else this.validators[name] = '';
  };

  validateForm = () => {
    const err: any = {};
    //(this.companyName);
    if (this.companyName === '') err.companyName = 'Required*';
    if (this.registrationNumber === '') err.registrationNumber = 'Required*';
    if (this.registrationDate === '') err.registrationDate = 'Required*';
    if (this.natureOfBusiness === '') err.natureOfBusiness = 'Required*';
    if (this.registrationType === '') err.registrationType = 'Required*';
    if (this.accountType === '') err.accountType = 'Required*';

    return err;
  };

  selectCompany = (item: any) => {
    this.registrationNumber = item.rcNumber || '';
    this.registrationDate = item.registrationDate
      ? moment(item.registrationDate).format('DD-MM-YYYY')
      : '';
    this.companyName = item.approvedName || '';
  };


  handleSubmit = () => {
    // //(this.validateForm());
    if (Object.keys(this.validateForm()).length > 0) {
      this.validators = { ...this.validators, ...this.validateForm() };
    } else {
      this.submit.emit({
        stage: 'Company Details',
        data: {
          companyName: this.companyName,
          registrationNumber: this.registrationNumber,
          registrationDate: moment(this.registrationDate).format('DD-MM-YYYY'),
          natureOfBusiness: this.natureOfBusiness,
          registrationType: this.registrationType,
          tin: this.tin,
          accountType: this.accountType,
        },
      });
    }
  };
}
