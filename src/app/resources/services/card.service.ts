import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(public apiService: ApiService) { }

  getCards() {
    return this.apiService.get(`cards`);
  }

  getCardRequests() {
    return this.apiService.get(`cards/requests`);
  }

  getOneCard(id: string) {
    return this.apiService.get(`cards/${id}`);
  }

  sendPin(id: string) {
    return this.apiService.get(`cards/${id}/send-pin`);
  }

  createCardRequests(data:any) {
    return this.apiService.post(`cards/requests`, data);
  }

  updateCardRequests(id:string) {
    return this.apiService.put(`cards/requests/${id}`, '');
  }

  block(id: string) {
    return this.apiService.put(`cards/${id}/block`, '');
  }

  unblock(id: string) {
    return this.apiService.put(`cards/${id}/unblock`, '');
  }

  linkCard(data: any) {
    return this.apiService.post(`cards/link`, data);
  }
}
