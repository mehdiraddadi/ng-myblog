import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { appRoutingModule } from './app.routing';
import { AlertComponent } from './alert/alert.component';
import { ErrorInterceptorService } from "./helpers/error-interceptor.service";
import { AdminComponent } from './admin/admin.component';
import {HeaderInterceptor} from "./helpers/header-interceptor";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormationComponent } from './profile/formation/formation.component';
import { ObjectifComponent } from './profile/objectif/objectif.component';
import { OverlayComponent } from './overlay/overlay.component';
import {OverlayModule} from "@angular/cdk/overlay";
import { UploadFileComponent } from './modal/upload-file/upload-file.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    AdminComponent,
    FormationComponent,
    ObjectifComponent,
    OverlayComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    NgbModule,
    OverlayModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [OverlayComponent]
})
export class AppModule { }
