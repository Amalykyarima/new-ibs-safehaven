export interface INewLoanRequest {
  primaryAccountId?: string;
  amount: number;
  totalMonths?: number;
  loanType: 'TermLoan' | 'Overdraft'; //TermLoan or Overdraft
  salaryAccountNumber?: string;
  salaryAccountBankCode?: string;
  salaryAccountName?: string;
  guarantorDetails?: IGaurantor;
  documents: IDocUplaod[];
}

export interface IGaurantor {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  companyName: string;
}

export interface IDocUplaod {
  url: string;
  name: string;
}

export interface IFile {
  fileName: string;
  fileType: string;
}
