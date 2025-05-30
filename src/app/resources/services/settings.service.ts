import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(public apiService: ApiService) {}

  getClient(id: string) {
    return this.apiService.get(`clients/${id}`);
  }

  // Users
  createUser(data: object) {
    return this.apiService.post(`users`, data);
  }

  getAllUsers() {
    return this.apiService.get(`users`);
  }

  getOneUser(id: string) {
    return this.apiService.get(`users/${id}`);
  }

  updateUser(id: string, data: object) {
    return this.apiService.put(`users/${id}`, data);
  }
  deleteUser(id: string) {
    return this.apiService.delete(`users/${id}`);
  }

  verifyInvite(data: any) {
    return this.apiService.post(`invite/verify`, data);
  }

  acceptUserInvite(data: any) {
    return this.apiService.post(`invite/user`, data);
  }
  resendInvite(id: any) {
    return this.apiService.post(`resend-invite-email/${id}`, {});
  }

  acceptDirectorInvite(data: any) {
    return this.apiService.post(`invite/director`, data);
  }

  cancelUserInvite(id: string) {
    return this.apiService.delete(`users/${id}`);
  }
  // Directors
  createDirector(data: object) {
    return this.apiService.post(`directors`, data);
  }

  getAllDirectors() {
    return this.apiService.get(`directors`);
  }

  getOneDirector(id: string) {
    return this.apiService.get(`directors/${id}`);
  }

  updateDirector(id: string, data: object) {
    return this.apiService.put(`directors/${id}`, data);
  }

  cancelDirectorInvite(id: string) {
    return this.apiService.delete(`directors/${id}`);
  }
  // Referees
  createReferee(clientId: string, data: object) {
    return this.apiService.post(`clients/${clientId}/referees`, data);
  }

  acceptRefereeInvite(data: any) {
    return this.apiService.post(`invite/referee`, data);
  }

  getAllReferees(clientId: string) {
    return this.apiService.get(`clients/${clientId}/referees`);
  }

  getOneReferee(clientId: string, refereeId: string) {
    return this.apiService.get(`clients/${clientId}/referees/${refereeId}`);
  }

  updateReferee(clientId: string, refereeId: string, data: object) {
    return this.apiService.put(
      `clients/${clientId}/referees/${refereeId}`,
      data
    );
  }

  cancelRefereeInvite(clientId: string, refereeId: string) {
    return this.apiService.delete(`clients/${clientId}/referees/${refereeId}`);
  }

  generateUploadUrl(data: any) {
    return this.apiService.post(`clients/generate-upload-url`, data);
  }

  generateInviteUploadUrl(data: any) {
    return this.apiService.post(`invite/generate-upload-url`, data);
  }

  uploadFile(url: string, file: any) {
    return this.apiService.uploadFile(url, file);
  }

  changePassword(data: any) {
    return this.apiService.put(`users/change-password`, data);
  }

  updateDocuments(data: any, id: string) {
    return this.apiService.put(`clients/${id}`, data);
  }

  updateNotificationSettings(data: any, id: string) {
    return this.apiService.put(`clients/${id}`, data);
  }

  createComplianceToken(id: string) {
    return this.apiService.get(`clients/${id}/compliance/token`);
  }

  requestActivation(id: string, data: any) {
    return this.apiService.put(`clients/${id}/activate`, data);
  }

  submitBVN(id: string, data: any) {
    return this.apiService.put(`clients/${id}/submit-bvn`, data);
  }
}
