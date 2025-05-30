import { Injectable } from '@angular/core';
import { PayAirtimeOrData, PayCableOrUtility, verifyVas } from '../models/vas';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class VasService {
  constructor(public apiService: ApiService) {}

  getServices() {
    return this.apiService.get(`vas/services`);
  }

  getOneServices(id: string) {
    return this.apiService.get(`vas/services/${id}`);
  }

  getCategoriesByService(id: string) {
    return this.apiService.get(`vas/service/${id}/service-categories`);
  }

  getProductByCategories(id: string) {
    return this.apiService.get(`vas/service-category/${id}/products`);
  }

  getClientVasTransactions(
    page: number,
    limit: number,
    fromDate: any,
    toDate: any,
    debitAccountNumber: string,
    vasType?: string,
    receiverNumber?: any
  ) {
    console.log(vasType)
    let receiver = receiverNumber ? `&receiverNumber=${receiverNumber}` : '';
    // console.log(receiver)
    return vasType
      ? this.apiService.get(
          `vas/transactions?debitAccountNumber=${debitAccountNumber}&page=${page}&limit=${limit}&fromDate=${fromDate}&toDate=${toDate}&vasType=${vasType}` +
            receiver
        )
      : this.apiService.get(
          `vas/transactions?debitAccountNumber=${debitAccountNumber}&page=${page}&limit=${limit}&fromDate=${fromDate}&toDate=${toDate}` +
            receiver
        );
  }

  getClientVasTransactionByReference(id: string) {
    return this.apiService.get(`vas/transaction/${id}`);
  }

  verifyPowerOrCableData(data: verifyVas) {
    return this.apiService.post(`vas/verify`, data);
  }

  buyUtilityOrCable(data: PayCableOrUtility, type: 'UTILITY' | 'CABLE') {
    return type == 'UTILITY'
      ? this.apiService.post(`vas/pay/utility`, data)
      : this.apiService.post(`vas/pay/cable-tv`, data);
  }

  buyAirtimeOrData(data: PayAirtimeOrData, type: 'AIRTIME' | 'DATA') {
    return type == 'AIRTIME'
      ? this.apiService.post(`vas/pay/airtime`, data)
      : this.apiService.post(`vas/pay/data`, data);
  }

  getVasBeneficiaries(serviceId: string) {
    return this.apiService.get(`vas/beneficiaries?serviceId=${serviceId}`);
  }

  deleteVasBeneficiary(id: string) {
    return this.apiService.delete(`vas/beneficiaries/${id}`);
  }
}
