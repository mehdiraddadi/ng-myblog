import { Routes, RouterModule } from '@angular/router';

import { GuardService } from './helpers/guard.service';
import { GuardIsAuthService } from './helpers/guard-is-auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [GuardService] },
  { path: 'login', component: LoginComponent, canActivate: [GuardIsAuthService] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
