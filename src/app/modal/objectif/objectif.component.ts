import { Component, OnInit } from '@angular/core';
import { MyOverlayRef } from "../../helpers/myoverlay-ref";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { UserService } from '../../services/user.service';
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrls: ['./objectif.component.css']
})
export class ObjectifComponent implements OnInit {
  FormObjectif: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ref: MyOverlayRef,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.FormObjectif = this.formBuilder.group({
      objectif: [this.ref.data.objectif, Validators.required]
    });
  }

  close(value: string) {
    this.ref.close(value);
  }

  submit(){
    if (!this.FormObjectif.invalid) {
      this.userService.updateInfos(this.FormObjectif)
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
