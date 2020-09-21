import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})

export class HeaderInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUToken = this.authenticationService.currentTokenValue;
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUToken && currentUToken.token) {
      request = request.clone({
        setHeaders: {
          'X-Auth-Token': `${currentUToken.token}`
        }
      });
    }
    return next.handle(request);
  }
}
