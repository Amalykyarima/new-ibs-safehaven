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


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(
        withInterceptors([authInterceptor])
      ),
      provideStore(),
      provideHttpClient(),
      provideRouter(routes),
      provideStore({ general: GeneralReducer, onboarding: OnboardingReducer  })
    ]
  });
