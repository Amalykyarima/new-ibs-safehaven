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
import { GeneralService } from '../../../resources/services/general.service';
import { CompanySignup } from '../../../resources/models/signup';
import { Signin } from '../../../resources/models/signin';
import { AuthService } from '../../../resources/services/auth.service';
import { SharedDataService } from '../../../resources/services/shared-data.service';
// import { RegistrationStateService } from '../../../resources/services/registration-state.service';

@Component({
  selector: 'app-setup-profile-corporate',
  standalone: true,
  imports: [CommonModule, SearchComponent, InputComponent, DatepickerComponent, SelectComponent, ButtonFilledComponent],
  templateUrl: './setup-profile-corporate.component.html',
  styleUrl: './setup-profile-corporate.component.scss'
})
export class SetupProfileCorporateComponent {

  @Output() spinnerChange = new EventEmitter<boolean>();
  @Output() accountOpenedChange = new EventEmitter<boolean>();
  @Output() accountFormStatusChange = new EventEmitter<boolean>();

  newUser: CompanySignup;
  date: any = new Date();

  signUpSuccess = false;
  // newUser: CompanySignup;
  errorMessage: string = '';
  processLoading: boolean = false;

  isLoading: boolean = false;
  referralCode: string = '';
  referralCodeEntered: string = '';
  loginData: any;
  userType = 'phone';


  constructor(
    private identityService: IdentitiesService,
    private generalService: GeneralService,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    // private registrationState: RegistrationStateService
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
      //("changes['form'].currentValue", changes['form'].currentValue);
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
      this.processLoading = false;
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



  // handleChangeStep1 = (
  //   name:
  //     | 'companyName'
  //     | 'registrationNumber'
  //     // | 'registrationDate'
  //     | 'natureOfBusiness'
  //     | 'registrationType'
  //     | 'tin'
  //     | 'emailAddress',
  //   value: any
  // ) => {
  //   console.log({
  //     companyName: this.companyName,
  //     registrationNumber: this.registrationNumber,
  //     natureOfBusiness: this.natureOfBusiness,
  //     registrationType: this.registrationType,
  //     tin: this.tin,
  //     email:this.emailAddress,
  //   });
  //   if (this.companyName !== '' && this.registrationNumber !== '' && this.natureOfBusiness !== '' && this.registrationType !== '' && this.tin !== '' && this.emailAddress !== '') {
  //     console.log('activeButtom')
  //   }

  //   if (name === 'emailAddress') {
  //     const isValidEmail = this.generalService.validateEmailAddress(value);
  //     if (!isValidEmail || isValidEmail === null) {
  //       console.log('nameeee', name)

  //       name === 'emailAddress'
  //       this.validators[name] = 'Required*'
  //     } else {
  //     this.activeButton();
  //     }
  //   }
  //   // //(value);
  //   // this.activeButton();

  //   if (name === 'companyName') {
  //     let regex = /[^a-zA-Z0-9 .,'&,@-]/g;
  //     this[name] = value.replace(regex, '').replaceAll('&', ' And ');
  //   } else this[name] = value;



  //   if (value === '' && name !== 'tin') this.validators[name] = 'Required*';
  //   else this.validators[name] = '';
  // };

  // handleChangeStep1 = (
  //   name:
  //     | 'companyName'
  //     | 'registrationNumber'
  //     // | 'registrationDate'
  //     | 'natureOfBusiness'
  //     | 'registrationType'
  //     | 'tin'
  //     | 'emailAddress',
  //   value: any
  // ) => {
  //   console.log({
  //     companyName: this.companyName,
  //     registrationNumber: this.registrationNumber,
  //     natureOfBusiness: this.natureOfBusiness,
  //     registrationType: this.registrationType,
  //     tin: this.tin,
  //     email: this.emailAddress,
  //   });

  //   // Email validation
  //   if (name === 'emailAddress') {
  //     const isValidEmail = this.generalService.validateEmailAddress(value);
  //     this.emailAddress = value;


  //     if (!value || !isValidEmail) {
  //       this.validators[name] = 'Invalid Email Address*';
  //       // this.inactiveButton();
  //     } else {
  //       this.validators[name] = '';
  //     }

  //     this[name] = value;
  //     // this.checkAllValidatorsClear(); // 👈 Check after update
  //     return;
  //   }


  //   // Clean company name
  //   if (name === 'companyName') {
  //     let regex = /[^a-zA-Z0-9 .,'&,@-]/g;
  //     this[name] = value.replace(regex, '').replaceAll('&', ' And ');
  //   } else {
  //     this[name] = value;
  //   }

  //   // Required validation
  //   if (value === '' && name !== 'tin') {
  //     this.validators[name] = 'Required*';
  //     this.inactiveButton();
  //   } else {
  //     this.validators[name] = '';
  //     this.activeButton()
  //   }

  // };
  handleChangeStep1 = (
    name:
      | 'companyName'
      | 'registrationNumber'
      // | 'registrationDate'
      | 'natureOfBusiness'
      | 'registrationType'
      | 'tin'
      | 'emailAddress',
    value: any
  ) => {
    console.log({
      companyName: this.companyName,
      registrationNumber: this.registrationNumber,
      natureOfBusiness: this.natureOfBusiness,
      registrationType: this.registrationType,
      tin: this.tin,
      email: this.emailAddress,
    });

    // Handle email validation separately
    if (name === 'emailAddress') {
      const isValidEmail = this.generalService.validateEmailAddress(value);
      this.emailAddress = value;

      if (!value || !isValidEmail) {
        this.validators[name] = 'Invalid Email Address*';
      } else {
        this.validators[name] = '';
        this.activeButton
      }

      this[name] = value;
      this.checkAllFieldsValid(); // ✅ check after update
      return;
    }

    // Clean company name
    if (name === 'companyName') {
      let regex = /[^a-zA-Z0-9 .,'&,@-]/g;
      this[name] = value.replace(regex, '').replaceAll('&', ' And ');
    } else {
      this[name] = value;
    }

    // Required field validation
    if (value === '' && name !== 'tin') {
      this.validators[name] = 'Required*';
    } else {
      this.validators[name] = '';
      // this.activeButton()
    }

    this.checkAllFieldsValid(); // ✅ check at the end
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
    if (value === '') {
      this.validators[name] = 'Required*';
    } else {
      this.validators[name] = '';
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
    this[name] = value;
    if (value === '') {
      this.validators[name] = 'Required*';
    } else {
      this.validators[name] = '';
    }
    this.checkAllFieldsValid3()
  };

  checkAllFieldsValid3 = () => {
    console.log('checking all fields')
    const fields = [
      this.address,
      this.state,
      this.city,
    ];

    const hasError = Object.values(this.validators).some(v => v !== '');

    const allFilled = fields.every(field => field && field !== '');

    if (allFilled && !hasError) {

      this.activeButton();
    } else {
    console.log(' eslse allFilled && !hasError')

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
      this.inactiveButton?.(); // Optional fallback
    }
  };



  validateFormStep1 = () => {
    const err: any = {};

    if (this.companyName === '') err.companyName = 'Required*';
    if (this.registrationNumber === '') err.registrationNumber = 'Required*';
    // if (this.registrationDate === '') err.registrationDate = 'Required*';
    if (this.natureOfBusiness === '') err.natureOfBusiness = 'Required*';
    if (this.registrationType === '') err.registrationType = 'Required*';
    if (this.accountType === '') err.accountType = 'Required*';
    return err;

  };


  signUp() {
    this.updateFormStatus(false)
    this.updateSpinner(true)

    // if (this.processLoading) return;

    // this.errorMessage = '';
    // this.processLoading = true;

    // if (
    //   [
    //     this.address,
    //     this.state,
    //     this.city,
    //   ].includes('')
    // ) {
    //   this.errorMessage = 'All director address fields are required.';
    //   this.processLoading = false;
    //   window.scrollTo(0, 0);
    // } else if (
    //   [
    //     this.company_address,
    //     this.company_state,
    //     this.company_city,
    //     this.newUser.accountType,
    //     this.newUser.password,
    //   ].includes('')
    // ) {
    //   this.errorMessage = 'All fields are required.';
    //   this.processLoading = false;
    //   window.scrollTo(0, 0);
    // } else {
    const data = {
      type: 'CAC-BVN',
      title: 'Mr',
      gender: 'Male',
      maritalStatus: 'Single',
      identityId: this.loginData?._id,
      emailAddress: this.emailAddress,
      identityType: 'BVN',
      companyName: this.companyName,
      registrationDate: '01-01-2024',
      registrationNumber: this.registrationNumber,
      natureOfBusiness: this.natureOfBusiness,
      registrationType: this.registrationType,
      tin: this.tin,
      directorAddress: {
        address: this.address,
        state: this.state,
        city: this.city
      },
      address: {
        address: this.company_address,
        state: this.company_state,
        city: this.company_city
      },
      accountType: 'Current',
      password: this.confirmPassword,
      referralCode: localStorage['referralId']
        ? localStorage['referralId']
        : '',
    };
    console.log('datea', data)

    this.authService.register(data).subscribe({
      next: (res) => this.handleRegistrationResponse(res),
      error: (err) => this.handleRegistrationError(err)
    });
  }

  private handleRegistrationResponse(res: any) {
    this.sharedDataService.setSpinner(false);

    if (res.statusCode === 200) {
      this.sharedDataService.setAccountOpened(true);
      // Optional: Navigate to success page
    } else {
      this.sharedDataService.setFormStatus(true);
      // Handle business logic errors
    }
  }

  private handleRegistrationError(err: any) {
    this.sharedDataService.changeSearchCompany(false);
    this.sharedDataService.setSpinner(false);
    this.sharedDataService.setAccountOpened(false);
    this.sharedDataService.setFormStatus(true);

    // Additional error handling
  }

  updateFormStatus(status: boolean) {
    this.sharedDataService.setFormStatus(status);
    console.log('updateFormStatus', status)
  }

  updateSpinner(show: boolean) {
    this.sharedDataService.setSpinner(show);
    console.log('updateFormStatus', show)

  }

  updateAccountOpened(opened: boolean) {
    this.sharedDataService.setAccountOpened(opened);
    console.log('updateFormStatus', opened)

  }

  // updateSpinner(show: boolean) {
  //   this.spinnerChange.emit(show);
  //   console.log('updateSpinner', show,)
  // }

  // updateAccountOpened(isOpened: boolean) {
  //   this.accountOpenedChange.emit(isOpened);
  //   console.log('updateAccountOpened', isOpened)

  // }

  // updateFormStatus(change: boolean) {
  //   this.accountFormStatusChange.emit(change);
  //   console.log('updateFormStatus', change)
  // }



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
}
