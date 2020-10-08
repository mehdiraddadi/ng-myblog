import { Component, OnInit } from '@angular/core';
import { MyOverlayRef } from '../../helpers/myoverlay-ref';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { UserService } from '../../services/user.service';
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  FormInfo: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ref: MyOverlayRef,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.FormInfo = this.formBuilder.group({
      firstname: [this.ref.data.firstname, Validators.required],
      lastname: [this.ref.data.lastname, Validators.required],
      phone: [this.ref.data.phone, Validators.required],
      address: [this.ref.data.address, Validators.required],
      profession: [this.ref.data.profession, Validators.required]
    });
  }

  close(value: string) {
    this.ref.close(value);
  }


  submit(){
    if (!this.FormInfo.invalid) {
      this.userService.updateInfos(this.FormInfo)
        .pipe(first())
        .subscribe(data => {
            localStorage.setItem('currentUser', JSON.stringify(data));
            this.alertService.clear();
            this.alertService.success('Uploaded!');
            this.ref.close(data);
          },
          error => {
            this.alertService.error(error);
            this.ref.close('error!');
          });
    }
  }
}
