import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getAll() {
    let headers = new HttpHeaders();
    let xAuthToken = JSON.parse(localStorage.getItem('currentToken')).token;
    headers.append('X-Auth-Token', xAuthToken);
    headers = headers.append('Content-Type', 'application/json');

    return this.http.get<User[]>(
      'http://localhost/api/admin/users', {headers: headers});
  }
}
