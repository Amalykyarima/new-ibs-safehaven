import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WebhooksService {
  constructor(public apiService: ApiService) {}

  getWebhooks(
    page: number,
    limit: number,
    fromDate: any,
    toDate: any,
    search: string
  ) {
    return this.apiService.get(
      `webhooks?page=${page}&limit=${limit}&fromDate=${fromDate}&toDate=${toDate}&search=${search}`
    );
  }
  getWebhook(id: string) {
    return this.apiService.get(`webhooks/${id}`);
  }
}
