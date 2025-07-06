type NatureOfBusiness =
  | 'Agric Business'
  | 'Contracting'
  | 'Financial Institutions'
  | 'Health Care'
  | 'Hospitality'
  | 'Lottery and Games'
  | 'Manufacturing'
  | 'NGOs, Associations and Clubs'
  | 'Professional Practice Firms'
  | 'Religious Bodies'
  | 'Retail Trade'
  | 'Schools'
  | 'Supply'
  | 'Wholesale Trade'
  | 'Technology'
  | 'Creative and Art Industry'
  | 'Others'
  | '';

type RegistrationType =
  | 'Limited Liability Companies'
  | 'Non-Limited Companies'
  | 'Associations and Cooperatives'
  | '';

type Type = 'BVN' | 'NIN' | 'PHONE';

type Title = 'Mr' | 'Mrs' | 'Miss';

type AccountType = 'Savings' | 'Current';

export class IndividualSignupWithNIN {
  type!: Type;
  identityId: string = '';
  emailAddress: string = '';
  accountType: AccountType = 'Savings';
  password: string = '';
}

export class IndividualSignupWithBVN {
  type!: Type;
  identityId: string = '';
  emailAddress: string = '';
  accountType: AccountType = 'Savings';
  password: string = '';
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  title: Title = 'Mr';
  gender: 'Male' | 'Female' = 'Male';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated' =
    'Single';
  constructor() {
    this.address = {
      street: '',
      city: '',
      state: '',
      country: 'Nigeria',
    };
  }
}

export class IndividualSignupWithPhone {
  type: 'PHONE' = 'PHONE';
  identityId: string = '';
  emailAddress: string = '';
  accountType: AccountType = 'Savings';
  password: string = '';
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  title: Title = 'Mr';
  firstName: string = '';
  lastName: string = '';
  otherNames: string = '';
  gender: 'Male' | 'Female' = 'Male';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated' =
    'Single';
  dateOfBirth: string = '';
  constructor() {
    this.address = {
      street: '',
      city: '',
      state: '',
      country: 'Nigeria',
    };
  }
}

export class CompanySignup {
  type: 'CAC-BVN' | 'BVN' | any;
  identityId: string = '';
  emailAddress: string = '';
  accountType: AccountType = 'Current';
  password: string = '';
  title: Title = 'Mr';
  gender: 'Male' | 'Female' = 'Male';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated' =
    'Single';
  address: {
    address: string;
    city: string;
    state: string;
    // country: string;
  };
  CompanyAddress: {
    address: string;
    city: string;
    state: string;
    // country: string;
  };
  registrationType: RegistrationType = '';
  registrationNumber: string = '';
  registrationDate: string = '';
  natureOfBusiness: NatureOfBusiness = '';
  tin?: string = '';
  constructor() {
    this.address = {
      address: '',
      city: '',
      state: '',
      // country: 'Nigeria',
    };
    this.CompanyAddress = {
      address: '',
      city: '',
      state: '',
      // country: 'Nigeria',
    };
  }
}

export class UserWithInvite {
  type!: Type;
  identityId: string = '';
  inviteToken: string = '';
  password: string = '';
  title: Title = 'Mr';
  gender: 'Male' | 'Female' = 'Male';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated' =
    'Single';
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  constructor() {
    this.address = {
      street: '',
      city: '',
      state: '',
      country: 'Nigeria',
    };
  }
}

export class DirectorWithInvite {
  type: Type = 'BVN';
  identityId: string = '';
  inviteToken: string = '';
  passportUrl: string = '';
  idCardUrl: string = '';
  signatureUrl: string = '';
  utilityBillUrl: string = '';
  password?: string;
  title: Title = 'Mr';
  gender: 'Male' | 'Female' = 'Male';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated' =
    'Single';
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  constructor() {
    this.address = {
      street: '',
      city: '',
      state: '',
      country: 'Nigeria',
    };
  }
}

export class RefereeWithInvite {
  type: Type = 'PHONE';
  identityId: string = '';
  inviteToken: string = '';
  name: string = '';
  contactAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  bankDetails: {
    accountNumber: string;
    bankCode: string;
    branchName: string;
    signatureUrl: string;
  };
  constructor() {
    this.contactAddress = {
      street: '',
      city: '',
      state: '',
      country: 'Nigeria',
    };
    this.bankDetails = {
      accountNumber: '',
      bankCode: '',
      branchName: '',
      signatureUrl: '',
    };
  }
}
