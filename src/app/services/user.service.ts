import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(
      'http://localhost/api/admin/users');
  }

  updatePhoto(form) {
    const formData = new FormData();
    formData.append('imageFile', form.get('fileSource').value);
      return this.http.post('http://localhost/api/admin/users/edit_photo', formData);
  }
}
