import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AppsService {

  constructor(public apiService: ApiService) { }

  createApp(data:object) {
    return this.apiService.post(`oauth2/clients`, data);
  }

  getApps() {
    return this.apiService.get(`oauth2/clients`);
  }

  getOneApp(id:string) {
    return this.apiService.get(`oauth2/clients/${id}`);
  }

  getOneClient(id:string) {
    return this.apiService.get(`oauth2-client/${id}`);
  }

  updateApp(data:object, id:string) {
    return this.apiService.put(`oauth2/clients/${id}`, data);
  }

  deleteApp(id:string) {
    return this.apiService.delete(`oauth2/clients/${id}`);
  }

  authorizeApp(data:any) {
    return this.apiService.post(`oauth2/authorize`, data);
  }
}
