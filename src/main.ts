import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { GeneralReducer } from '../src/app/resources/store/general/general.reducer';
import { provideStore } from '@ngrx/store';
import { OnboardingReducer } from './app/resources/store/onboarding/onboarding.reducer'; // adjust this path
import { authInterceptor } from './app/resources/interceptors/auth.interceptor';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { provideNzI18n } from 'ng-zorro-antd/i18n';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  bootstrapApplication(AppComponent, {
    providers: [
      provideNzI18n(en_US),
      provideHttpClient(
        withInterceptors([authInterceptor])
      ),
      provideStore(),
      provideHttpClient(),
      provideRouter(routes),
      provideStore({ general: GeneralReducer, onboarding: OnboardingReducer  })
    ]
  });
