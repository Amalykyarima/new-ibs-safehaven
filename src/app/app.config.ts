import {
  ApplicationConfig,
  LOCALE_ID,
  importProvidersFrom,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  provideHttpClient,
  HTTP_INTERCEPTORS,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './resources/interceptors/auth.interceptor';
import { registerLocaleData } from '@angular/common';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import zh from '@angular/common/locales/zh';
import { provideState, provideStore } from '@ngrx/store';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

registerLocaleData(zh);
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(),
    // provideStore(reducer),
    importProvidersFrom(NzNotificationModule),
    importProvidersFrom(ToastModule),
    MessageService,
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: NZ_I18N, useValue: en_US },
  ],
};
