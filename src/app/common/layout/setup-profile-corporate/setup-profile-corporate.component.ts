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

@Component({
  selector: 'app-setup-profile-corporate',
  standalone: true,
  imports: [CommonModule, SearchComponent, InputComponent, DatepickerComponent, SelectComponent, ButtonFilledComponent],
  templateUrl: './setup-profile-corporate.component.html',
  styleUrl: './setup-profile-corporate.component.scss'
})
export class SetupProfileCorporateComponent {
  newUser: CompanySignup;
  date: any = new Date();

  signUpSuccess = false;
  // newUser: CompanySignup;
  errorMessage: string = '';
  processLoading: boolean = false;

  isLoading: boolean = false;
  referralCode: string = '';
  referralCodeEntered: string = '';
  constructor(
    private identityService: IdentitiesService,
    private generalService: GeneralService,
    private authService: AuthService,

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
    }

    if (changes['form']) {
      //("changes['form'].currentValue", changes['form'].currentValue);
      this.state = changes['form'].currentValue.state;
      this.address = changes['form'].currentValue.address;
      this.city = changes['form'].currentValue.city;
    }


  }

  // activeButton() {
  //   this.isLoading = true;
  // }

  activeButton = () => {
    console.log('activeButton')
    this.isLoading = true;
  };

  inactiveButton = ()=>{
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

  // async signUpCorporate() {
  //   // Only continue if process is not loading
  //   // if (this.processLoading) return;
  //   // this.errorMessage = "";
  //   // this.processLoading = true;
  //   // this.referralCode = await this.generalService.getReferralId();
  //   // console.log("getReferralId signUpIndividual", this.referralCode)

  //   if (this.referralCode === null || this.referralCode === '') {
  //     this.referralCode = this.referralCodeEntered
  //   }
  //   // console.log('this.referralCode else', this.referralCode)

  //   let data: CompanySignup = new CompanySignup();
  //   data = {
  //     ...data,
  //     // type: 'EMAIL',
  //     // identityId: this.identityId,
  //     // emailAddress: this.userIdentifier.toLowerCase(),
  //     // accountType: 'Current',
  //     // title: this.title,
  //     // gender: this.selectedGender,
  //     companyName: this.companyName,
  //     // maritalStatus: this.maritalStatus,
  //     password: this.password,
  //     registrationType: this.registrationType,
  //     registrationNumber: this.registrationNumber,
  //     // registrationDate: this.dateOfBirth,
  //     // NatureOfBusiness: this.natureOfBusiness,
  //     // natureOfBusiness: this.natureOfBusiness,
  //     natureOfBusiness: this.natureOfBusiness as NatureOfBusiness, // ✅ Fix


  //     tin: this.tin,
  //     // referralCode: this.referralCode,
  //     address: {
  //       address: this.address,
  //       city: this.city,
  //       state: this.state,
  //       // country: this.country
  //     },
  //     CompanyAddress: {
  //       address: this.company_address,
  //       city: this.company_city,
  //       state: this.company_state,
  //       // country: this.company_country
  //     },

  //   }
  //   // let signInData: Signin = new Signin();

  //   // signInData = {
  //   //   ...signInData,
  //   //   password: this.form.value.password,
  //   //   emailAddress: this.signInType == 'email' ? this.form.value.emailAddress : '',
  //   //   phoneNumber: this.signInType === 'phoneNumber' ? `+234${this.form.value.phoneNumber}` : '',
  //   //   // phoneNumber: this.signInType == 'phoneNumber' ? '+234' + this.form.value.phoneNumber : '',
  //   //   // phoneNumber: this.signInType == 'phoneNumber' ? this.form.value.phoneNumber.internationalNumber : undefined,
  //   //   type: this.signInType == 'email' ? 'EMAIL' : 'PHONE',
  //   //   // biometricType: this.form.value.biometricType,
  //   // }

  //   if ([
  //     // this.address.street,
  //   // this.address.country,
  //   this.state,
  //   this.city,
  //   // this.company_street,
  //   // this.company_country,
  //   this.company_state,
  //   this.company_city,
  //   this.accountType,
  //   // this.title,
  //   // this.gender,
  //   // this.maritalStatus,
  //   this.companyName,
  //   this.password].includes("")) {
  //     // this.generalService.showErrorMessage('All fields are required.');
  //     // this.currentStep === 2;
  //     // this.errorMessage = "All fields are required.";
  //     // this.processLoading = false;
  //   }
  //   else {
  //     // this.identityId = this.identityId;
  //     // this.dateOfBirth = this.generalService.formatDateISO(this.date);
  //     this.emailAddress = this.emailAddress.toLowerCase();
  //     // console.log('data', data)
  //     this.authService.registerCorporate(data).subscribe(
  //       (res: any) => {
  //         if (res.statusCode === 200) {
  //           // this.store.dispatch(generalActions.setSignInDetails({ signInDetails: signInData }));
  //           //   console.log('generalService.saveUser(res.data)1', res.data)
  //           this.generalService.newSaveUser1(res);
  //           // this.processLoading = false;
  //           // this.generalService.showSuccessMessage(res.message);
  //           // setTimeout(() => {
  //           //   this.currentStep = 6;
  //           // }, 1000);

  //         }
  //         else {
  //           // this.generalService.showErrorMessage(res.message);
  //           // this.errorMessage = '' + res.message;
  //           // this.processLoading = false;
  //         }
  //       },
  //       (error: any) => {
  //         // this.errorMessage = 'An error occured. Please try again later';
  //         // this.processLoading = false;
  //       }
  //     )
  //   }
  // }



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
      console.log('step1')
      this.handleSubmitStep1()
      this.stepChange.emit(this.step + 1);

    } else if (this.step === 1 && this.isLoading === true) {
      console.log('step2')

      this.handleSubmitStep2()
      this.stepChange.emit(this.step + 1);
    } else if (this.step === 2 && this.isLoading === true) {
      console.log('step3')

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

    // if (this.step < this.totalSteps - 1) {
    //   this.stepChange.emit(this.step + 1);
    // }
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

    // Email validation block
    if (name === 'emailAddress') {
      const isValidEmail = this.generalService.validateEmailAddress(value);

      if (!value || !isValidEmail) {
        this.validators[name] = 'Invalid Email Address*';
        this.inactiveButton();

      } else {
        this.validators[name] = '';
        this.activeButton();
      }

      this[name] = value; // Always update the email field
      return;
    }

    // Clean companyName input
    if (name === 'companyName') {
      let regex = /[^a-zA-Z0-9 .,'&,@-]/g;
      this[name] = value.replace(regex, '').replaceAll('&', ' And ');
    } else {
      this[name] = value;
    }

    // Required field validation
    if (value === '' && name !== 'tin') {
      this.validators[name] = 'Required*';
      this.inactiveButton();
    } else {
      this.validators[name] = '';
    }

    // Optional: Enable button if all required fields are filled
    if (
      this.companyName !== '' &&
      this.registrationNumber !== '' &&
      this.natureOfBusiness !== '' &&
      this.registrationType !== '' &&
      this.tin !== '' &&
      this.emailAddress !== ''
    ) {
      console.log('activeButton');
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
  };

  handleChange2 = (name: 'password' | 'confirmPassword', value: any) => {
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
    }
  };


  // handleChange2 = (name: 'password' | 'confirmPassword', value: any) => {
  //   this[name] = value;
  //   if (value === '') this.validators[name] = 'Required*';
  //   else if (name === 'password' && !this.passwordIsStrong)
  //     this.validators[name] = 'Password is weak*';
  //   else if (name === 'confirmPassword' && this.password !== value)
  //     this.validators[name] = 'Passwords do not match*';
  //   else this.validators[name] = '';
  // };

  // handleChangeStep3 = (
  //   name: 'address' | 'state' | 'city' | 'phoneNumber',
  //   value: any
  // ) => {
  //   this[name] = value;
  //   if (value === '') this.validators[name] = 'Required*';
  //   else this.validators[name] = '';
  // };

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

  // signUp() {
  //   // Only continue if process is not loading
  //   // if (this.processLoading) return;
  //   console.log('newUser',
  //     this.newUser.CompanyAddress.address,
  //       this.newUser.CompanyAddress.state,
  //       this.newUser.CompanyAddress.city,
  //   )
  //   this.errorMessage = '';
  //   this.processLoading = true;
  //   if (
  //     [
  //       this.newUser.CompanyAddress.address,
  //       this.newUser.CompanyAddress.state,
  //       this.newUser.CompanyAddress.city,
  //     ].includes('')
  //   ) {
  //     this.errorMessage = 'All director address fields are required.';
  //     this.processLoading = false;
  //     window.scrollTo(0, 0);
  //   } else if (
  //     [
  //       this.newUser.address.state,
  //       this.newUser.address.city,
  //       this.newUser.password,
  //     ].includes('')
  //   ) {
  //     this.errorMessage = 'All fields are required.';
  //     this.processLoading = false;
  //     window.scrollTo(0, 0);
  //   } else {
  //     // this.newUser.identityId = this.validationID;
  //     // this.newUser.registrationDate = this.generalService.formatDateISO(
  //     //   this.date
  //     // );
  //     this.newUser.registrationNumber = '' + this.newUser.registrationNumber;
  //     this.newUser.emailAddress = this.newUser.emailAddress.toLowerCase();
  //     this.newUser.tin = '' + this.newUser.tin;
  //     // this.newUser.type = 'CAC-BVN';
  //     this.authService.register(this.newUser).subscribe(
  //       (res: any) => {
  //         if (res.statusCode === 200) {
  //           this.processLoading = false;
  //           this.signUpSuccess = true;
  //           // this.notification.success(
  //           //   'Account signup successful.',
  //           //   '' + res.message,
  //           //   { nzClass: 'notification1' }
  //           // );
  //           localStorage.removeItem('reg_type');
  //         } else {
  //           this.errorMessage = '' + res.message;
  //           this.processLoading = false;
  //           window.scrollTo(0, 0);
  //         }
  //       },
  //       (error: any) => {
  //         this.errorMessage = 'An error occured. Please try again later';
  //         this.processLoading = false;
  //         window.scrollTo(0, 0);
  //       }
  //     );
  //   }
  // }

  signUp() {
    const data = {
      companyName: this.companyName,
      registrationDate: '01-01-2024',
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
      accountType: 'Current',
      // Password: this.password,
      password: this.confirmPassword
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
}
