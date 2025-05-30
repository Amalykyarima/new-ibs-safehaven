import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private generalService: GeneralService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let data = this.generalService.getStorageData();
    let secureReq;
    // Don't add header to external APIs
    if (
      !request.url.includes('safehavenmfb.com') &&
      !request.url.includes('localhost') &&
      !request.url.includes('-feature-')
    ) {
      secureReq = request.clone();
    } else {
      if (data.clientId && data.jwtToken) {
        secureReq = request.clone({
          setHeaders: {
            ClientID: data.clientId,
            Authorization: data.jwtToken,
          },
        });
      } else {
        if (localStorage.sign) {
          // console.log('found header');
          const decode = JSON.parse(window.atob(localStorage.sign));
          secureReq = request.clone({
            setHeaders: {
              Authorization: decode.jwtToken,
            },
          });
        } else secureReq = request.clone();
      }
    }
    return next.handle(secureReq).pipe(
      catchError((error) => {
        if (error.status === 403) {
          this.generalService.logoutUser();
        }
        if (error.status === 500) {
          return throwError({
            statusCode: 500,
            message: 'An error occured. Please try again later.',
          });
        } else {
          return throwError('User not signed in');
        }
      })
    );
  }
}
