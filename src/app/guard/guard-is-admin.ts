import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class GuardIsAdmin implements CanActivate{

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentToken = this.authenticationService.currentTokenValue;
    if(currentToken) {
      const currentUser = this.authenticationService.currentUserValue;
      if(currentUser.roles) {
         if('ROLE_ADMIN' in currentUser.roles) {
           console.log(typeof currentUser.roles);
           // this.router.navigate(['/admin'], { queryParams: { returnUrl: state.url } });
           return true;
         } else {
           return false;
        }
      }
    }
    // not logged in so redirect to login page with the return url
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // return false;
  }
}
