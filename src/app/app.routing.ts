import { Routes, RouterModule } from '@angular/router';

import { GuardService } from './guard/guard.service';
import { GuardIsAdmin } from './guard/guard-is-admin';
import { GuardIsAuthService } from './guard/guard-is-auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {AdminComponent} from "./admin/admin.component";
import {ObjectifComponent} from "./profile/objectif/objectif.component";
import {FormationComponent} from "./profile/formation/formation.component";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [GuardService] },
  { path: 'admin', component: AdminComponent, canActivate: [GuardService, GuardIsAdmin] },
  { path: 'login', component: LoginComponent, canActivate: [GuardIsAuthService] },
  { path: 'edit/profile/formation/:id', component: FormationComponent, canActivate: [GuardService] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
