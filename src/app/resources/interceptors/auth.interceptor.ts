import { inject } from '@angular/core';
import { HttpRequest, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const generalService = inject(GeneralService);
  const loaderService = inject(LoaderService);
  const router = inject(Router);
  loaderService.show();

  console.log('1111111111111111')
  const data = generalService.getStorageData();
  console.log('auth data', data)

  let modifiedReq = req;

  if (
console.log('22222222'),

    req.url.includes('safehavenmfb.com') ||
    req.url.includes('localhost') ||
    req.url.includes('-feature-')

  ) {
    if (data?.jwtToken && data?.clientId) {
      console.log('333333333333')

      modifiedReq = req.clone({
        setHeaders: {
          Authorization: data.jwtToken,
          ClientID: data.clientId,
        }
      });
    }
  }

  return next(modifiedReq).pipe(
    catchError((error) => {
      if (error.status === 403) {
        generalService.logoutUser();
        router.navigate(['/signin']);
      }

      if (error.status === 500) {
        return throwError(() => ({
          statusCode: 500,
          message: 'An error occurred. Please try again later.',
        }));
      }

      return throwError(() => error);
    }),
    finalize(() => {
      loaderService.hide();
    })
  );
};
