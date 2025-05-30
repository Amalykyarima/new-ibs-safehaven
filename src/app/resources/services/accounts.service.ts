import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(public apiService: ApiService) {}

  createMainAccount(data: object) {
    return this.apiService.post(`accounts`, data);
  }

  createSubAccount(data: object) {
    return this.apiService.post(`accounts/subaccount`, data);
  }

  getMainAccounts(page: number, limit: number) {
    return this.apiService.get(`accounts?page=${page}&limit=${limit}`);
  }

  getSubAccounts(page: number, limit: number) {
    return this.apiService.get(
      `accounts?page=${page}&limit=${limit}&isSubAccount=true`
    );
  }
  searchSubAccounts(search: string, page: number, limit: number) {
    return this.apiService.get(
      `accounts?page=${page}&limit=${limit}&accountNumber=${search}&isSubAccount=true`
    );
  }

  getOneAccount(id: string) {
    return this.apiService.get(`accounts/${id}`);
  }

  updateAccount(id: string, data: any) {
    return this.apiService.put(`accounts/${id}`, data);
  }

  initiateBvnValidation = (data: any) => {
    return this.apiService.post('identity/v2', data);
  };

  getAccountStatement(
    id: string,
    page: number,
    limit: number,
    fromDate: any,
    toDate: any,
    type: string,
    searchTerm: string
  ) {
    return this.apiService.get(
      `accounts/${id}/statement?page=${page}&limit=${limit}&fromDate=${fromDate}&toDate=${toDate}&type=${type}&searchTerm=${searchTerm}`
    );
  }

  exportAccountStatement(
    id: string,
    fromDate: any,
    toDate: any,
    type: string,
    searchTerm: string
  ) {
    return this.apiService.get(
      `accounts/${id}/statement/export?fromDate=${fromDate}&toDate=${toDate}&type=${type}&searchTerm=${searchTerm}`
    );
  }
  exportAccountStatement_(
    id: string,
    fromDate: any,
    toDate: any,
    type: string,
    searchTerm: string
  ) {
    return this.apiService.get(
      `accounts/${id}/account-statement/export?fromDate=${fromDate}&toDate=${toDate}&type=${type}&searchTerm=${searchTerm}`
    );
  }
}
