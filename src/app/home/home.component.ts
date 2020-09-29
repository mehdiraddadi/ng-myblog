import {Component, OnInit, TemplateRef} from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

import {AlertService} from "../services/alert.service";
import {ComponentType} from "@angular/cdk/portal";
import {OverlayService} from "../helpers/overlay.service";
import {UploadFileComponent} from "../modal/upload-file/upload-file.component";
import {InformationComponent} from "../modal/information/information.component";
import {Router} from "@angular/router";
import { Location } from "@angular/common";
import {ObjectifComponent} from "../modal/objectif/objectif.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];
  content = 'A simple string content modal overlay';
  UploadComponent      = UploadFileComponent;
  InformationComponent = InformationComponent;
  ObjectifComponent = ObjectifComponent;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private overlayService: OverlayService,
    private router: Router,
    private _location: Location
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

  open(content: TemplateRef<any> | ComponentType<any> | string, data: any | null) {
    if(data === "information" || data == "objectif") {
      var infoData = {
        firstname: this.currentUser.firstname,
        lastname: this.currentUser.lastname,
        profession: this.currentUser.profession,
        address: this.currentUser.address,
        phone: this.currentUser.phone,
        objectif: this.currentUser.objectif
      }

      const ref = this.overlayService.open(content, infoData);
      ref.afterClosed$.subscribe(res => {
        if (typeof content === 'string') {
        } else if (content === this.InformationComponent || content === this.ObjectifComponent) {
          if(res.type !== 'backdropClick' && res.data !== null) {
            this.currentUser = res.data
          }
        }
      });
    } else {
      const ref = this.overlayService.open(content, null);
    }

  }
}
