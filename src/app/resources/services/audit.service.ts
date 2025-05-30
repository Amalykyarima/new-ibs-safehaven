import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(public apiService: ApiService) { }

  getEventLogs(page: number, limit: number, fromDate: any, toDate:any) {
    return this.apiService.get(`events/logs?page=${page}&limit=${limit}&fromDate=${fromDate}&toDate=${toDate}`);
  }
}
