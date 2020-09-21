import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardIsAuthService implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentToken = this.authenticationService.currentTokenValue;
    if (currentToken) {

      this.router.navigate(['/admin'], { queryParams: { returnUrl: state.url }});
      return false;
    }

    return true;
  }
}
