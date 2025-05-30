import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url!: string;
  env = environment;

  constructor(private http: HttpClient) {
    this.url = this.env.apiUrl;
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
      };
    }
    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + endpoint, body, reqOpts);
  }

  // Special external api endpoints

  // API endpoint to fetch all countries
  getAllCountries() {
    return this.http.get('assets/json/countries.json');
  }
  // API endpoint to fetch country by code
  getOneCountry(countryCode: string) {
    if (countryCode.length > 3) {
      return this.http.get(
        `https://restcountries.eu/rest/v2/name/${countryCode}`
      );
    }
    return this.http.get(
      `https://restcountries.eu/rest/v2/alpha/${countryCode}`
    );
  }

  // getStates = () => {
  //   return this.http.get(
  //     `https://maps.googleapis.com/maps/api/geocode/json?address=Nigeria&key=${this.google_api_key}`
  //   );
  // };

  // getCities = (state: any) => {
  //   return this.http.get(
  //     `https://maps.googleapis.com/maps/api/place/textsearch/json`,
  //     {
  //       params: {
  //         query: `cities in ${state}, Nigeria`,
  //         key: this.google_api_key,
  //       },
  //     }
  //   );
  // };

  uploadFile(url: string, file: any, reqOpts?: any) {
    return this.http.put(url, file, reqOpts);
  }
}
