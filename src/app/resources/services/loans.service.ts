import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IDocUplaod, IFile, INewLoanRequest } from '../models/loans';

@Injectable({
  providedIn: 'root',
})
export class LoansService {
  constructor(public apiService: ApiService) {}

  getSummary = () => {
    return this.apiService.get('loans/products');
  };

  getPrimaryAccounts = (page: number, limit: number) => {
    return this.apiService.get(`accounts?page=${page}&limit=${limit}`);
  };

  initiateRequest = (data: INewLoanRequest) => {
    return this.apiService.post('loans/request', data);
  };

  getLoanRequests = () => {
    return this.apiService.get('loans/requests');
  };

  getAllLoans = () => {
    return this.apiService.get('loans/account');
  };

  getLoanStatus = (id: string) => {
    return this.apiService.get(`loans/reviews/${id}`);
  };

  getLoanActivity = () => {
    return this.apiService.get(`loans/account`);
  };

  getNextRepayment = (id: string) => {
    return this.apiService.get(`loans/next-payment/${id}`);
  };

  getLoanRepaymentPlan = (id: string) => {
    return this.apiService.get(`loans/repayment-plan/${id}`);
  };

  acceptLoan = (id: string, data: any) => {
    return this.apiService.put(`loans/reviews/${id}`, data);
  };

  acceptLoanOffer = (id: string, data: any) => {
    return this.apiService.put(`loans/approval/${id}`, data);
  };

  rejectLoanOffer = (id: string, data: any) => {
    return this.apiService.put(`loans/approval/${id}`, data);
  };

  getLoanPayments = (id: string) => {
    return this.apiService.get(`loans/transactions/${id}`);
  };

  getBankList = () => {
    return this.apiService.get(`transfers/banks`);
  };

  loanQuota = (data: any) => {
    return this.apiService.post(`loans/calculate`, data);
  };

  repayLoan = (data: { loanId: string; amount: string | number }) => {
    return this.apiService.post(`loans/manual/payment`, data);
  };

  docUpload = async (data: IFile, file: any | IDocUplaod) => {
    const res: any = await this.apiService
      .post('clients/generate-upload-url', data)
      .toPromise();
    if (res.statusCode === 200) {
      await this.uploadFile(res.data.signedUrl, file).toPromise();
      return { message: 'success', data: { url: res.data.url } };
    } else {
      return res;
    }
  };

  uploadFile(url: string, file: any) {
    return this.apiService.uploadFile(url, file);
  }

  getOverdraftFees = (
    loanId: string,
    page: number,
    limit: number,
    fromDate: any,
    toDate: any
  ) => {
    return this.apiService.get(
      `loans/overdraft/fees/${loanId}?page=${page}&limit=${limit}&fromDate=${fromDate}&toDate=${toDate}`
    );
  };
}
