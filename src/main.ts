import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { GeneralReducer } from '../src/app/resources/store/general/general.reducer';
import { provideStore } from '@ngrx/store';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      provideRouter(routes),
      provideStore({ general: GeneralReducer })
    ]
  });
