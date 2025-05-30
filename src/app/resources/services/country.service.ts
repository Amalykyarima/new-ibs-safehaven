import { HttpClient } from "@angular/common/http";
import { Injectable, Component, OnInit, ElementRef, NgZone } from "@angular/core";

// country.service.ts
@Injectable({ providedIn: 'root' })
export class CountryService {
  constructor(private http: HttpClient) {}

  getAllCountries() {
    return this.http.get('/api/countries');
  }
}
