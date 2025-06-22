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
import { FormGroup } from '@angular/forms';



// import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchComponent } from "../../utilities/search/search.component";
import { InputComponent } from "../../utilities/input/input.component";
import { DatepickerComponent } from "../../utilities/datepicker/datepicker.component";
import { SelectComponent } from "../../utilities/select/select.component";
import { ButtonFilledComponent } from "../../utilities/button-filled/button-filled.component";
import { IdentitiesService } from '../../../resources/services/identities.service';
import { GeneralService } from '../../../resources/services/general.service';
import { CompanySignup } from '../../../resources/models/signup';
import { Signin } from '../../../resources/models/signin';
import { AuthService } from '../../../resources/services/auth.service';
import { SharedDataService } from '../../../resources/services/shared-data.service';
import { Router } from '@angular/router';
import { SmallButtonComponent } from '../../utilities/small-button/small-button.component';
@Component({
  selector: 'app-setup-profile-individual',
  standalone: true,
  imports: [CommonModule, SmallButtonComponent, InputComponent, SelectComponent, ButtonFilledComponent],
  templateUrl: './setup-profile-individual.component.html',
  styleUrl: './setup-profile-individual.component.scss'
})
export class SetupProfileIndividualComponent {

  newUser: CompanySignup;
  date: any = new Date();

  signUpSuccess = false;
  errorMessage: string = '';
  processLoading: boolean = false;

  isLoading: boolean = false;
  referralCode: string = '';
  referralCodeEntered: string = '';
  loginData: any;


  active: boolean = false;

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
  passwordType = 'password';
  showPassword = false;
  email: string = '';
  gender: string = '';



  @Input() additional: boolean = false;
  @Input() home: boolean = true;
  @Input() passwordSetup: boolean = false;

  spinner: boolean = false;

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



  constructor(
    private identityService: IdentitiesService,
    private generalService: GeneralService,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private router: Router,
  ) {
    this.newUser = new CompanySignup();
  }

  states: any[] = [];
  address = '';
  company_address = '';
  state = '';
  company_state = '';
  city = '';
  company_city = '';
  passwordType1 = 'password'
  passwordType2 = 'password'
  password = '';
  confirmPassword = '';
  emailAddress = '';


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
  // registrationType: 'Limited Liability Companies' | 'Non-Limited Companies' | 'Associations and Cooperatives' = 'Limited Liability Companies';

  // natureOfBusiness = '';
  natureOfBusiness: string = '';

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
    company_address: '',
    company_state: '',
    company_city: '',
    address: '',
    state: '',
    city: '',
    password: '',
    confirmPassword: '',
    emailAddress: '',
    phoneNumber: '',
    email: '',
    gender: ''
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
    this.loginData = this.sharedDataService.getLoginData();

    if (this.loginData?.user) {
      this.emailAddress = this.loginData.user; // or this.loginData.user.email if nested
    }
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
    }

    if (changes['form']) {
      this.state = changes['form'].currentValue.state;
      this.address = changes['form'].currentValue.address;
      this.city = changes['form'].currentValue.city;
    }


  }



  activeButton = () => {
    console.log('activeButton')
    this.isLoading = true;
  };

  inactiveButton = () => {
    console.log('activeButton')
    this.isLoading = false;
  }

  getLGAS = (state: string = '') => {
    console.log(state, 'state')
    return state === '' ? [] : getLgas(state);
  };

  nextt() {
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

  next = () => {
    console.log(this.step, this.isLoading, 'step')
    if (this.step === 0 && this.isLoading === true) {
      this.inactiveButton();

      console.log('step1')
      this.handleSubmitStep1()
      this.stepChange.emit(this.step + 1);

    } else if (this.step === 1 && this.isLoading === true) {
      console.log('step2')
      this.inactiveButton();

      this.handleSubmitStep2()
      this.stepChange.emit(this.step + 1);
    } else if (this.step === 2 && this.isLoading === true) {
      console.log('step3')
      this.inactiveButton();

      this.handleSubmitStep3()
      this.stepChange.emit(this.step + 1);


    } else if (this.step === 3 && this.isLoading === true) {

      console.log(
        {
          companyName: this.companyName,
          registrationNumber: this.registrationNumber,
          natureOfBusiness: this.natureOfBusiness,
          registrationType: this.registrationType,
          tin: this.tin,
          company_address: this.company_address,
          company_state: this.company_state,
          company_city: this.company_city,
          address: this.address,
          state: this.state,
          city: this.city,
          Password: this.password,
          password: this.confirmPassword,
        }
      )
      this.signUp();
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

  checkAllFieldsValid = () => {
    const fields = [
      this.companyName,
      this.registrationNumber,
      this.natureOfBusiness,
      this.registrationType,
      this.tin,
      this.emailAddress,
    ];

    const hasError = Object.values(this.validators).some(v => v !== '');

    const allFilled = fields.every(field => field && field !== '');

    if (allFilled && !hasError) {
      this.activeButton();
    } else {
      this.inactiveButton?.(); // Optional fallback
    }
  };




  handleChangeStep2 = (name: 'company_address' | 'company_state' | 'company_city', value: any) => {
    console.log({
      address: this.company_address, state: this.company_state, city: this.company_city,
    });

    this[name] = value;
    // if (value === '') this.validators[name] = 'Required*' ;
    // else this.validators[name] = '';
    if (value === '') {
      this.validators[name] = 'Required*';
      // this.inactiveButton(); // 👈 Call inactive when value is empty
    } else {
      this.validators[name] = '';
      // this.activeButton();
    }
    this.checkAllFieldsValid2()

  };

  checkAllFieldsValid2 = () => {
    const fields = [
      this.company_address,
      this.company_state,
      this.company_city,
    ];

    const hasError = Object.values(this.validators).some(v => v !== '');

    const allFilled = fields.every(field => field && field !== '');

    if (allFilled && !hasError) {
      this.activeButton();
    } else {
      this.inactiveButton?.(); // Optional fallback
    }
  };

  handleChangeStep3 = (name: 'address' | 'state' | 'city', value: any) => {
    // console.log(name, value);
    this[name] = value;
    // if (value === '') this.validators[name] = 'Required*';
    // else this.validators[name] = '';
    if (value === '') {
      this.validators[name] = 'Required*';
      // this.inactiveButton();
    } else {
      this.validators[name] = '';
      // this.activeButton();
    }
    this.checkAllFieldsValid3()
  };

  checkAllFieldsValid3 = () => {
    const fields = [
      this.phoneNumber,
      this.gender,
      this.city,
    ];

    const hasError = Object.values(this.validators).some(v => v !== '');

    const allFilled = fields.every(field => field && field !== '');

    if (allFilled && !hasError) {
      this.activeButton();
    } else {
      this.inactiveButton?.(); // Optional fallback
    }
  };

  handleChangeStep4 = (name: 'password' | 'confirmPassword', value: any) => {
    this[name] = value;

    if (value === '') {
      this.validators[name] = 'Required*';
      // this.inactiveButton();
    } else if (name === 'password' && !this.passwordIsStrong) {
      this.validators[name] = 'Password is weak*';
    } else if (name === 'confirmPassword' && this.password !== value) {
      this.validators[name] = 'Passwords do not match*';
    } else {
      this.validators[name] = '';
      // this.activeButton();
    }
    this.checkAllFieldsValid4()
  };

  checkAllFieldsValid4 = () => {
    const fields = [
      this.password,
      this.confirmPassword,
    ];

    const hasError = Object.values(this.validators).some(v => v !== '');

    const allFilled = fields.every(field => field && field !== '');

    if (allFilled && !hasError) {
      this.activeButton();
    } else {
      this.inactiveButton?.();
    }
  };


  validateFormStep1 = () => {
    const err: any = {};

    if (this.companyName === '') err.companyName = 'Required*';
    if (this.registrationNumber === '') err.registrationNumber = 'Required*';
    if (this.natureOfBusiness === '') err.natureOfBusiness = 'Required*';
    if (this.registrationType === '') err.registrationType = 'Required*';
    if (this.accountType === '') err.accountType = 'Required*';
    return err;

  };



  signUp() {
    // Only continue if process is not loading
    if (this.processLoading) return;

    this.errorMessage = '';
    this.processLoading = true;

    const data = {
      identityId: this.loginData._id,
      phoneNumber: this.loginData.user,
      type: 'PHONE',
      title: 'Mr',
      gender: 'Male',
      maritalStatus: 'Single',
      emailAddress: this.emailAddress,
      identityType: 'International Passport',
      companyName: this.companyName,
      registrationDate: '01-01-2024',
      tin: this.tin,
      address: {
        address: this.address,
        state: this.state,
        city: this.city
      },
      accountType: this.accountType,
      password: this.confirmPassword,
      referralCode: localStorage['referralId']
        ? localStorage['referralId']
        : '',
    };

    this.authService.register(data).subscribe({
      next: (res) => {
        console.log('Registration successful', res);
        // e.g., this.router.navigate(['/success']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        // e.g., this.errorMessage = err.message;
      }
    });
  }



  selectCompany = (item: any) => {
    this.registrationNumber = item.rcNumber || '';
    this.registrationDate = item.registrationDate
      ? moment(item.registrationDate).format('DD-MM-YYYY')
      : '';
    this.companyName = item.approvedName || '';
  };

  validateFormStep2 = () => {
    const err: any = {};
    if (this.address === '') err.address = 'Required*';
    if (this.state === '') err.state = 'Required*';
    if (this.city === '') err.city = 'Required*';

    if (Object.keys(err).length === 0) {
      this.isLoading = true;
    }

    return err;
  };

  validateFormStep3 = () => {
    const err: any = {};
    if (this.password === '') err.password = 'Required*';
    else if (!this.passwordIsStrong) err.password = 'Password is weak*';
    if (this.confirmPassword === '') err.confirmPassword = 'Required*';
    else if (this.confirmPassword !== this.password)
      err.confirmPassword = 'Passwords do not match*';

    if (Object.keys(err).length === 0) {
      this.isLoading = true;
    }
    return err;
  };


  handleSubmitStep1 = () => {
    // //(this.validateForm());
    if (Object.keys(this.validateFormStep1()).length > 0) {
      this.validators = { ...this.validators, ...this.validateFormStep1() };
    } else {
      this.submit.emit({
        stage: 'Company Details',
        data: {
          companyName: this.companyName,
          registrationNumber: this.registrationNumber,
          // registrationDate: moment(this.registrationDate).format('DD-MM-YYYY'),
          natureOfBusiness: this.natureOfBusiness,
          registrationType: this.registrationType,
          tin: this.tin,
          accountType: this.accountType,
        },
      });
    }

  };

  handleSubmitStep2 = () => {
    if (Object.keys(this.validateFormStep2()).length > 0) {
      console.log(this.validateFormStep2());
      this.validators = { ...this.validators, ...this.validateFormStep2() };
    } else {
      this.submit.emit({
        stage: 2,
        data: {
          address: this.company_address,
          state: this.company_state,
          city: this.company_city,
        },
      });
    }

  };

  handleSubmitStep3 = () => {
    if (Object.keys(this.validateFormStep3()).length > 0) {
      this.validators = { ...this.validators, ...this.validateFormStep3() };
    } else {
      this.submit.emit({
        stage: 3,
        data: {
          password: this.password,
          confirmPassword: this.confirmPassword,
        },
      });
    }

  };

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


  handleChangeStep1 = (name: 'phoneNumber' | 'emailAddress' | 'gender', value: any) => {
    this[name] = value;
    if (value === '') {
      this.validators[name] = 'Required*';
    } else {
      this.validators[name] = '';
    }
    this.checkAllFieldsValid3()
  };


}


