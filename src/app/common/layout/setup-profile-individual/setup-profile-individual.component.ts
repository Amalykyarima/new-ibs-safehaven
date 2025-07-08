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
  @Input() inputSpinner: boolean = false;


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
      name: 'Savings Account',
      type: 'Savings',
      icon: '../../../../assets/icons/savings.svg',
      active: '../../../../assets/icons/savings-active.svg',
    },
    {
      id: 2,
      name: 'Current Account',
      type: 'Current',
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
    accountType: '',
    address: '',
    state: '',
    city: '',
    password: '',
    confirmPassword: '',
    emailAddress: '',
    phoneNumber: '',
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
  selectedAccountType: string = ''; // To store the selected type
activeAccountId: number | null = null; // To track which account is active




  ngOnInit(): void {
    this.states = getStates();
    this.selectAccount(this.accountTypes[0]);
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];
    this.loginData = this.sharedDataService.getLoginData();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form'] && changes['form'].currentValue.companyName) {
      //(changes['form'].currentValue);
      this.accountType = changes['form'].currentValue.accountType;
      this.showForm = true;
    }

    if (changes['form']) {
      this.state = changes['form'].currentValue.state;
      this.address = changes['form'].currentValue.address;
      this.city = changes['form'].currentValue.city;
    }


  }

  selectAccount(account: any) {
    this.activeAccountId = account.id;
    this.selectedAccountType = account.type;
    this.accountType = this.selectedAccountType;
    console.log('Selected account type:', this.accountType, this.emailAddress, this.gender);
    // this.handleChangeStep1('emailAddress', account)

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

      console.log(
        {
          phoneNumber: this.loginData?.user,
          emailAddress:this.emailAddress,
          accountType: this.accountType,
          gender: this.gender,
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

  private handleRegistrationResponse(res: any) {
    console.log('handleRegistrationResponse')
    this.sharedDataService.setSpinner(false);

    if (res.statusCode === 200) {
    console.log('handleRegistrationResponse')

      this.sharedDataService.setAccountOpened(true);
    } else {
      this.sharedDataService.setFormStatus(true);
    }
  }

  private handleRegistrationError(err: any) {
    console.log('handleRegistrationResponse')

    this.sharedDataService.changeSearchCompany(false);
    this.sharedDataService.setSpinner(false);
    this.sharedDataService.setAccountOpened(false);
    this.sharedDataService.setFormStatus(true);

  }

  updateFormStatus(status: boolean) {
    console.log('updateFormStatus')

    this.sharedDataService.setFormStatus(status);
    console.log('updateFormStatus',status)
  }

  updateSpinner(show: boolean) {
    console.log('updateSpinner')

    this.sharedDataService.setSpinner(show);
    console.log('updateFormStatus', show)

  }

  updateAccountOpened(opened: boolean) {
    console.log('updateAccountOpened')

    this.sharedDataService.setAccountOpened(opened);
    console.log('updateFormStatus',opened)

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


  handleChangeStep2 = (name: 'address' | 'state' | 'city', value: any) => {
    console.log({
      address: this.address, state: this.state, city: this.city,
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
      this.address,
      this.state,
      this.city,
    ];

    // const hasError = Object.values(this.validators).some(v => v !== '');

    const allFilled = fields.every(field => field && field !== '');

    if (allFilled) {
    console.log('allFilled && !hasError')

      this.activeButton();
    } else {
    console.log('eslse allFilled && !hasError')

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
      this.inactiveButton?.(); // Optional fallback
    }
  };

  checkAllFieldsValid = () => {
    const fields = [
      this.accountType,
      this.gender,
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

  handleChangeStep4 = (name: 'password' | 'confirmPassword', value: any) => {
    this[name] = value;

    if (value === '') {
      this.validators[name] = 'Required*';
    } else if (name === 'password' && !this.passwordIsStrong) {
      this.validators[name] = 'Password is weak*';
    } else if (name === 'confirmPassword' && this.password !== value) {
      this.validators[name] = 'Passwords do not match*';
    } else {
      this.validators[name] = '';
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

    if (this.accountType === '') err.accountType = 'Required*';
    return err;

  };



  signUp() {
    this.updateFormStatus(false)
    this.updateSpinner(true)

    const data = {
      type: 'PHONE',
      identityId: this.loginData?._id,
      emailAddress: this.emailAddress,
      accountType: this.accountType,
      title: 'Mr',
      gender: 'Male',
      phoneNumber: this.loginData.user,
      maritalStatus: 'Single',
      identityType: 'International Passport',
      dateOfBirth: '01-01-1994',
      address: {
        address: this.address,
        state: this.state,
        city: this.city
      },
      password: this.confirmPassword,
      referralCode: localStorage['referralId']
        ? localStorage['referralId']
        : '',
    };

    this.authService.newRegister(data).subscribe({
      next: (res) => this.handleRegistrationResponse(res),
      error: (err) => this.handleRegistrationError(err)
    });

  }



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
        stage: 'Additional Information',
        data: {
          emailAddress: this.emailAddress,
          gender: this.gender,
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
          address: this.address,
          state: this.state,
          city: this.city,
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
      this.router.navigate(['/home']); // adjust this path as needed
    } else if (this.home) {
      this.additional = true;
      this.home = false;
      this.passwordSetup = false;
    } else if (this.passwordSetup) {
      this.additional = false;
      this.home = true;
      this.passwordSetup = false;
    }
  }


  handleChangeStep1 = (name: 'accountType' | 'emailAddress' | 'gender', value: any) => {
    console.log({
      accountType: this.accountType,
      email: this.emailAddress,
      gender: this.gender,
    });

      if (name === 'emailAddress') {
        const isValidEmail = this.generalService.validateEmailAddress(value);

        if (!value || !isValidEmail) {
          this.validators[name] = 'Invalid Email Address*';
        } else {
          this.validators[name] = '';
          this.activeButton
        }

        this[name] = value;
        this.checkAllFieldsValid();
        return;
      }

      this[name] = value;

    if (value === '') {
      this.validators[name] = 'Required*';
    } else {
      this.validators[name] = '';
    }
    this.checkAllFieldsValid()
  };



}


