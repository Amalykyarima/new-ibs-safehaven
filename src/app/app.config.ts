import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './resources/interceptors/auth.interceptor';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { provideState, provideStore } from '@ngrx/store';
import { OnboardingReducer } from './resources/store/onboarding/onboarding.reducer';
import { GeneralReducer } from './resources/store/general/general.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';





registerLocaleData(zh);

export const appConfig: ApplicationConfig = {

  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideAnimations(),
     provideRouter(routes),
      provideClientHydration(),
       provideHttpClient(withInterceptors([authInterceptor])),
       { provide: NZ_I18N, useValue: en_US },
        provideStore(),
        provideState({name: 'onboarding', reducer: OnboardingReducer }),
        provideState({name: 'general', reducer: GeneralReducer })


      ]
};
