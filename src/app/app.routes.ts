import { Routes } from '@angular/router';
import LoginComponent from './authentication/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { AuthGuard } from './authentication/auth.guard';
import { HomeUserComponent } from './home-user/home-user/home-user.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'home-user',
    component: HomeUserComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'profile', component: ProfileComponent }],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
