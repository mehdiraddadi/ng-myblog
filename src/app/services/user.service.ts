import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../models/user';
import {AuthenticationService} from "./authentication.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {}

  getAll() {
    return this.http.get<User[]>(
      'http://localhost/api/admin/users');
  }

  updatePhoto(form) {
    const formData = new FormData();
    formData.append('imageFile', form.get('fileSource').value);
      return this.http.post('http://localhost/api/admin/users/edit_photo', formData);
  }

  updateInfos(form) {
    const formData = new FormData();
    const InfoUser = {
      firstname: (form.get('firstname'))? form.get('firstname').value: this.authenticationService.currentUserValue.firstname,
      lastname: (form.get('lastname'))? form.get('lastname').value: this.authenticationService.currentUserValue.lastname,
      phone: (form.get('phone'))? form.get('phone').value: this.authenticationService.currentUserValue.phone,
      address: (form.get('address'))? form.get('address').value: this.authenticationService.currentUserValue.address,
      profession: (form.get('profession'))? form.get('profession').value: this.authenticationService.currentUserValue.profession,
      objectif: (form.get('objectif'))? form.get('objectif').value: this.authenticationService.currentUserValue.objectif
    }
    formData.append('firstname', InfoUser.firstname);
    formData.append('lastname', InfoUser.lastname);
    formData.append('phone', InfoUser.phone);
    formData.append('address', InfoUser.address);
    formData.append('profession', InfoUser.profession);
    formData.append('objectif', InfoUser.objectif);
    return this.http.post('http://localhost/api/admin/users/edit_infos', formData);
  }
}
