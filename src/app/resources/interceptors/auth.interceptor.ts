import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry } from 'rxjs/operators';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';


// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private generalService: GeneralService, private router: Router) {}

//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     let data = this.generalService.getStorageData();
//     console.log('data', data)
//     let secureReq;
//     // Don't add header to external APIs
//     if (
// !request.url.includes('safehavenmfb.com') &&
// !request.url.includes('localhost') &&
// !request.url.includes('-feature-')
//     ) {
//       secureReq = request.clone();
//     } else {
//       if (data.clientId && data.jwtToken) {
//         secureReq = request.clone({
//           setHeaders: {
//             ClientID: data.clientId,
//             Authorization: data.jwtToken,
//           },
//         });
//       } else {
//         console.log('else------', )

//         if (localStorage['sign']) {
//           // console.log('found header');
//           const decode = JSON.parse(window.atob(localStorage['sign']));
//           secureReq = request.clone({
//             setHeaders: {
//               Authorization: decode.jwtToken,
//             },
//           });
//         } else secureReq = request.clone();
//       }
//     }
//     return next.handle(secureReq).pipe(
//       catchError((error) => {
//         if (error.status === 403) {
//           this.generalService.logoutUser();
//         }
//         if (error.status === 500) {
//           return throwError({
//             statusCode: 500,
//             message: 'An error occured. Please try again later.',
//           });
//         } else {
//           return throwError('User not signed in');
//         }
//       })
//     );
//   }
// }

console.log('111111111111111')
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let generalService = inject(GeneralService);
  let loaderService = inject(LoaderService);

  loaderService.show();

  const router = inject(Router);

  console.log('222222222222')

  const data = generalService.getStorageData() ?? '';
  // let data = generalService.getStorageData('SHMFB');
  console.log('auth data', data)

  let secureReq;

  if (
    !req.url.includes('safehavenmfb.com') &&
    !req.url.includes('localhost') &&
    !req.url.includes('-feature-')
  ) {
    secureReq = req.clone();
  } else if (data && data.jwtToken && data.clientId) {
    console.log('data && data.jwtToken && data.clientId', data && data.jwtToken && data.clientId)
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${data.jwtToken}`,
        ClientID: data.clientId,
        // 'ngrok-skip-browser-warning': 'true', // Skip ngrok warning
      },
      //   headers: req.headers.set('Authorization', token),
    });
    // 'ngrok-skip-browser-warning': true,
    return next(authReq).pipe(
      catchError((error) => {
        if (error.status === 403) {
          generalService.logoutUser();
        }
        if (error.status === 500) {
          return throwError({
            statusCode: 500,
            message: 'An error occurred. Please try again later.',
          });
        } else {
          return throwError('An error occurred. Please try again later.');
        }
      }),
      finalize(() => {
        loaderService.hide();
      })
    );
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 403) {
        // toast.error('Session expired');
        router.navigate(['/signin']);
      }
      // Pass the error to the caller
      return throwError(() => error);
    }),
    finalize(() => {
      loaderService.hide();
    })
  );
};
