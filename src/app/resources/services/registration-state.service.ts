// registration-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationStateService {
  private formStatus = new BehaviorSubject<boolean>(true);
  private spinner = new BehaviorSubject<boolean>(false);
  private accountOpened = new BehaviorSubject<boolean>(false);

  formStatus$ = this.formStatus.asObservable();
  spinner$ = this.spinner.asObservable();
  accountOpened$ = this.accountOpened.asObservable();

  setFormStatus(status: boolean) {
    this.formStatus.next(status);
  }

  setSpinner(show: boolean) {
    this.spinner.next(show);
  }

  setAccountOpened(opened: boolean) {
    this.accountOpened.next(opened);
  }
}
