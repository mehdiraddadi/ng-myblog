import {Component, OnInit, TemplateRef} from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

import { FormGroup, FormControl, Validators} from '@angular/forms';
import {AlertService} from "../services/alert.service";
import {ComponentType} from "@angular/cdk/portal";
import {OverlayService} from "../helpers/overlay.service";
import {UploadFileComponent} from "../modal/upload-file/upload-file.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];
  content = 'A simple string content modal overlay';
  UploadComponent = UploadFileComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private overlayService: OverlayService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
  }

  private loadAllUsers() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

  open(content: TemplateRef<any> | ComponentType<any> | string) {
    const ref = this.overlayService.open(content, null);

    // ref.afterClosed$.subscribe(res => {
    //   if (typeof content === 'string') {
    //   } else if (content === this.yesNoComponent) {
    //     this.yesNoComponentResponse = res.data;
    //   } else {
    //     this.yesNoTemplateResponse = res.data;
    //   }
    // });
  }
}
