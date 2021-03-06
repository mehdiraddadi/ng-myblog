import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from "../services/authentication.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      let token = this.authenticationService.currentTokenValue.id;
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout(token);
        location.reload(true);
      }
      if (err.status === 500 && err.error.message === "Invalid authentication token") {
        this.authenticationService.logout(token);
        location.reload(true);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
