// shared-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedDataService {
  private loginData: any;
  private verifiedData: any;
  private formStatus = new BehaviorSubject<boolean>(true);
  private spinner = new BehaviorSubject<boolean>(false);
  private accountOpened = new BehaviorSubject<boolean>(false);
  private SearchCompany = new BehaviorSubject<boolean>(true);


  formStatus$ = this.formStatus.asObservable();
  spinner$ = this.spinner.asObservable();
  accountOpened$ = this.accountOpened.asObservable();
  SearchCompany$ = this.accountOpened.asObservable();

  setLoginData(data: any) {
    this.loginData = data;
    console.log('setting LoginData this.loginDATA', this.loginData)

  }

  getLoginData() {
    console.log('returning.loginData')

    return this.loginData;
  }


  setVerifiedData(data: any) {
    this.verifiedData = data;
  }

  getVerifiedData() {
    return this.verifiedData;
  }

  setFormStatus(status: boolean) {
    this.formStatus.next(status);
  }

  setSpinner(show: boolean) {
    this.spinner.next(show);
  }

  setAccountOpened(opened: boolean) {
    this.accountOpened.next(opened);
  }

  changeSearchCompany(status: boolean){
    this.SearchCompany.next(status)
  }

}
