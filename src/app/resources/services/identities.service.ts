import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class IdentitiesService {
  constructor(public apiService: ApiService) {}

  SendOTP(data: any) {
    return this.apiService.post('identities/verify', data);
  }

  VerifyOTP(data: any, validationID: string) {
    return this.apiService.put(`identities/${validationID}/validate`, data);
  }

  Verify2FA(data: any, validationID: string) {
    return this.apiService.put(`identities/${validationID}/validate/2fa`, data);
  }

  resendOTP(data: any, validationID: string) {
    return this.apiService.put(`identities/${validationID}/resendotp`, data);
  }

  searchCompany(data: any) {
    return this.apiService.post(`identities/search-cac`, data);
  }

  newIdentityService = (data: any) => {
    console.log('payload', data);
    return this.apiService.post(`identity/customer/verification`, data);
  };
  newOtpValidationService = (id: string, data: any) => {
    return this.apiService.post(`identity/customer/validate/${id}`, data);
  };

  identityLivenessTokenService = () => {
    return this.apiService.get(`liveness/create`);
  };
}
