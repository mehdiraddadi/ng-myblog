import { Component, OnInit } from '@angular/core';
import { first } from "rxjs/operators";
import { User } from "../models/user";
import { UserService } from "../services/user.service";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loading = false;
  users: User[] = [];

  constructor(private userService: UserService,
              private alertService: AlertService) {}

  ngOnInit(): void {
    this.loading = true;
    // reset alerts on submit
    this.alertService.clear();

    this.userService.getAll().pipe(first()).subscribe(
      users => {
        this.loading = false;
        this.users = users;
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    )
  }

}
