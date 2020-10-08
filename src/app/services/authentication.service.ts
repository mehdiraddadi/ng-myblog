import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, pipe} from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import {Token} from "../models/token";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  // ajouter token
  private currentTokenSubject: BehaviorSubject<Token>;
  public currentToken: Observable<Token>;

  constructor(private http: HttpClient, private router: Router) {
    // ajouter token
    this.currentTokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('currentToken')));
    this.currentToken = this.currentTokenSubject.asObservable();

      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // ajouter token
  public get currentTokenValue(): Token {
    return this.currentTokenSubject.value;
  }

  login(username, password) {

    let formData: any = new FormData();
    formData.append("login", username);
    formData.append("password", password);

    return this.http.post<any>('http://localhost/api/auth-tokens/login', formData)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('currentUser', JSON.stringify(user));

        localStorage.setItem('currentToken', JSON.stringify(user));
        localStorage.setItem('currentUser', JSON.stringify(user.user));

        this.currentTokenSubject.next(user);
        this.currentUserSubject.next(user.user);

        return user;
      }));
  }

  logout(token) {

    return this.http.delete('http://localhost/api/auth-tokens/' + token)
      .subscribe(
        res => {
          localStorage.removeItem('currentToken');
          this.currentUserSubject.next(null);

          localStorage.removeItem('currentUser');
          this.currentTokenSubject.next(null);
          this.router.navigate(['/login']);
        }
      );
  }
}
