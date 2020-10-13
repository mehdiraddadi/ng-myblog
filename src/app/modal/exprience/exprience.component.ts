import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MyOverlayRef} from "../../helpers/myoverlay-ref";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";
import {AuthenticationService} from "../../services/authentication.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-exprience',
  templateUrl: './exprience.component.html',
  styleUrls: ['./exprience.component.css']
})
export class ExprienceComponent implements OnInit {

  start_date: string;
  end_date: string;
  inPost: boolean;
  FormExprience: FormGroup;
  pipe = new DatePipe('en-US');

  exprienceId: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ref: MyOverlayRef,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.exprienceId = this.route.snapshot.paramMap.get('id');
    this.initForm();
  }

  close(value: string) {
    this.ref.close(value);
  }

  initForm() {
    const formatedStartDate = Date.parse(this.ref.data.start_date);
    const formatedEndDate = Date.parse(this.ref.data.end_date);
    this.start_date = this.pipe.transform(formatedStartDate, 'yyyy-MM-dd');
    this.end_date = this.pipe.transform(formatedEndDate, 'yyyy-MM-dd');
    this.inPost =this.ref.data.inPost;


    console.log(this.ref.data)
    this.FormExprience = this.formBuilder.group({
      end_date: ['', Validators.required],
      start_date: ['', Validators.required],
      description: [this.ref.data.description, Validators.required],
      title: [this.ref.data.title, Validators.required],
      inPost: [false, Validators.required]
    });
  }

  submit() {
    let id = this.ref.data.id;
    if (!this.FormExprience.invalid) {

    }
  }

}
