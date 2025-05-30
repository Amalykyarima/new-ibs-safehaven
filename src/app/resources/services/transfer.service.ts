import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class TransferService {

    constructor(public apiService: ApiService) { }

    generalBankList() {
        return this.apiService.get(`banks`);
    }

    bankList() {
        return this.apiService.get(`transfers/banks`);
    }

    beneficiaries() {
        return this.apiService.get(`transfers/beneficiaries`);
    }

    removeBeneficiaries(id: string) {
        return this.apiService.delete(`transfers/beneficiaries/${id}`);
    }

    nameEnquiry(data: object) {
        return this.apiService.post(`transfers/name-enquiry`, data);
    }

    createTransfer(data: object) {
        return this.apiService.post(`transfers`, data);
    }

    updateTransfer(data: object, id: string) {
        return this.apiService.put(`transfers/${id}`, data);
    }

    transfers(id: string, page: any, limit: any, type: string, status: string, fromDate: any, toDate: any, searchTerm: string) {
        return this.apiService.get(`transfers?page=${page}&limit=${limit}&fromDate=${fromDate}&toDate=${toDate}&accountId=${id}&type=${type}&status=${status}&searchTerm=${searchTerm}`);
    }

    sendOTP(data: { method: string }) {
        return this.apiService.post(`transfers/2fa/send-otp`, data);
    }

    resendOTP(data: { otpId: string, method: string }) {
        return this.apiService.post(`transfers/2fa/resend-otp`, data);
    }

    recheckTransfer(data: { sessionId: string }) {
        return this.apiService.post(`/transfers/tqs`, data);
    }
}
