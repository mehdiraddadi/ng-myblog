import { Component, OnInit } from '@angular/core';
import { MyOverlayRef } from '../../helpers/myoverlay-ref';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { UserService } from '../../services/user.service';
import {AlertService} from "../../services/alert.service";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  myForm: FormGroup;
  constructor(
              private formBuilder: FormBuilder,
              private ref: MyOverlayRef,
              private userService: UserService,
              private alertService: AlertService,
              private authenticationService: AuthenticationService) {}


  initForm() {
    this.myForm = this.formBuilder.group({
      file: ['', Validators.required],
      fileSource: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.initForm();
  }

  close(value: string) {
    this.ref.close(value);
  }

  get f(){
    return this.myForm.controls;
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  submit(id: string){
    if (!this.myForm.invalid) {
      this.userService.updatePhoto(this.myForm)
        .pipe(first())
        .subscribe(data => {
            console.log('dfd')
            let currentUser = this.authenticationService.currentUserValue;
            currentUser.filename = data.message;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            this.alertService.clear();
            this.alertService.success('Uploaded!');
            this.ref.close('uploaded!');
          },
          error => {
            this.alertService.error(error);
            this.ref.close('error!');
          });
    }
  }

}
