import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyOverlayRef} from "../../helpers/myoverlay-ref";
import {first} from "rxjs/operators";
import {DatePipe} from "@angular/common";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  dateObtained: string;
  FormFormation: FormGroup;
  pipe = new DatePipe('en-US');

  formationId: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private ref: MyOverlayRef,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private alertService: AlertService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.formationId = this.route.snapshot.paramMap.get('id');
    this.initForm();
  }

  initForm() {
    const formatedDateObtained = Date.parse(this.ref.data.dateObtained);
    this.dateObtained = this.pipe.transform(formatedDateObtained, 'yyyy-MM-dd');
    console.log(this.pipe.transform(formatedDateObtained, 'yyyy-MM-dd'));
    this.FormFormation = this.formBuilder.group({
      dateObtained: ['', Validators.required],
      establishment: [this.ref.data.establishment, Validators.required],
      name: [this.ref.data.name, Validators.required]
    });
  }
  submit() {
    let id = this.ref.data.id;
    if (!this.FormFormation.invalid) {
      this.userService.updateFormation(id, this.FormFormation)
        .pipe(first())
        .subscribe(data => {
          let currentUser = this.authenticationService.currentUserValue;
          let formationStorage = currentUser.formations ;
            for (let key in formationStorage) {
              if(formationStorage[key].id === id) {
                formationStorage[key] = data;
              }
            }
            currentUser.formations = formationStorage;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
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

  close(value: string) {
    this.ref.close(value);
  }

}
