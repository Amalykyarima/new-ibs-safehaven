import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from './api.service';
// import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import * as generalActions from '../store/general/general.actions';
import * as generalReducer from '../store/general/general.reducer';
import { select, Store } from '@ngrx/store';
import { take, tap, map } from 'rxjs/operators';
import { selectCurrentUser } from '../store/general/general.selectors';
import { Observable } from 'rxjs';
import { SettingsService } from './settings.service';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  selectedOption: any = null;
  environment: typeof environment = environment;

  constructor(
    private location: Location,
    private store: Store,
    public apiService: ApiService,
    // private loadingBar: LoadingBarService,
    private router: Router,
    private authService: AuthService,
    private settingsService: SettingsService,
    private generalStore: Store<generalReducer.State>
  ) { }

  encryptStorage = new EncryptStorage(this.environment.privateKey, {
    prefix: '@shmfb',
    storageType: 'sessionStorage',
  });



  goBack() {
    this.location.back();
  }

  goToOnboardingHome() {
    this.router.navigate(['/signin']);
    localStorage.removeItem('actionType');
  }

  formatDateISO(date: any): string {
    var d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  getAllCountries() {
    return this.apiService.getAllCountries().pipe(
      tap((countries: any) => {
        // Sort by name
        countries.sort(function (a: any, b: any) {
          var nameA = a.name.common.toUpperCase();
          var nameB = b.name.common.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });

        countries.map((value: any) => {
          value.name = value.name.common;
        });
      })
    );
  }

  validateEmailAddress(emailString: string) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      !!emailString &&
      typeof emailString === 'string' &&
      emailString.match(emailRegex)
    );
  }

  changePINInputmode() {
    setTimeout(() => {
      let otps: HTMLCollection = document.getElementsByClassName('otp-input');
      for (let i = 0; i < otps.length; i++) {
        document
          .getElementsByClassName('otp-input')
        [i].setAttribute('inputmode', 'numeric');
      }
    }, 500);
  }

  async getUserData() {
    let storeData: any = await this.getUserFromStore();
    if (storeData.user !== undefined) {
      return storeData;
    } else {
      let res: any = await this.getUserFromAPI();
      this.saveUser(res.data);
      return res.data;
    }
  }

  // async getUserFromAPI() {
  //   let response = await this.authService.authorize().toPromise();
  //   return response;
  // }

  async getUserFromAPI() {
    try {
      const response = await firstValueFrom(this.authService.authorize());
      return response;
    } catch (error) {
      console.error('Authorization failed:', error);
      throw error;
    }
  }


  async getUserFromStore() {
    return await this.generalStore
      .select(selectCurrentUser)
      .pipe(take(2))
      .toPromise();
  }

  async getUserFromStore2() {
    return this.generalStore.select(selectCurrentUser);
  }

  async authenticateUser() {
    let response: any = await this.authService.authorize().toPromise();
    if (response.statusCode !== 403) {
      return true;
    }
    return false;
  }

  logoutUser() {
    this.encryptStorage.clear();
    window.location.replace('/signin');
  }

  saveUser(user: any) {
    console.log('Dispatching saveCurrentUser with:', user);
    try {
      this.generalStore.dispatch(
        generalActions.saveCurrentUser({ currentUser: user })
      );
      let storageData = {
        clientId: user.client._id,
        jwtToken: user.jwtToken,
      };
    console.log('storageData:', storageData);


      if (user.client.type === 'Individual')
        localStorage.setItem('@shmfb?chat', window.btoa(user.client.firstName));
      else
        localStorage.setItem('@shmfb?chat', window.btoa(user.client.fullName));
      this.setStorageData(storageData);
    } catch (e) {
      let storageData = {
        clientId: user.client._id,
        jwtToken: user.jwtToken,
      };

      if (user.client.type === 'Individual')
        localStorage.setItem('@shmfb?chat', window.btoa(user.client.firstName));
      else
        localStorage.setItem('@shmfb?chat', window.btoa(user.client.fullName));
      this.setStorageData(storageData);
    }
  }


  async refreshUserData() {
    let res: any = await this.getUserFromAPI();
    console.log('res', res)
    this.saveUser(res.data);
    return res.data;
  }

  copyText(text: any): boolean {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    return true;
  }

  setStorageData(data: any) {
    this.encryptStorage.setItem('SHMFB', JSON.stringify(data));
  }

  getStorageData(): any {
    console.log('getstorage')
    return this.encryptStorage.getItem('SHMFB')
      ? this.encryptStorage.getItem('SHMFB')
      : {};
  }


  setToken(jwtToken: string) {
    this.encryptStorage.setItem('token', jwtToken);
  }
  setUser(user: any) {
    this.encryptStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string {
    return this.encryptStorage.getItem('token')!;
  }
  // getUser = () => {
  //   return JSON.parse(this.encryptStorage.getItem('user'));
  // };

  // getStates = async () => {
  //   return await  this.apiService.getStates().toPromise();
  // };
  // getCities = async (state: string) => {
  //   return await this.apiService.getCities(state).toPromise();
  // };
}
