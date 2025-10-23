import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Token } from '../../token';
import { DecodedToken } from '../../decoded-token';
import moment from 'moment-timezone';

const materialModules = [
  RouterOutlet,
  FormsModule,
  CommonModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [materialModules],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  user: string = '';
  password: string = '';
  loginValid: boolean = true;
  year: number = new Date().getFullYear();
  helper = new JwtHelperService();
  decodedToken: string | null = '';
  tocken: Token = { token: '' };
  expirationDate: string = '';
  decTokenObj: DecodedToken | null = null;
  constructor(public authService: AuthService, private router: Router) {}

  login(): void {
    console.log('user and password:', this.user, this.password);
    this.authService.login(this.user, this.password).subscribe({
      next: () => {
        this.loginValid = true;
        this.router.navigate(['/home-user']);
        console.log('tocken login:', this.authService.accessToken().token);
        this.tocken = this.authService.accessToken();
        console.log('token string:', this.tocken);
        this.decodedToken = this.helper.decodeToken(this.tocken.token);
        this.decTokenObj = new Object(this.decodedToken) as DecodedToken;
        console.log('decoded token object iat:', this.decTokenObj.iat);
        this.expirationDate =
          this.helper.getTokenExpirationDate(this.tocken.token)?.toString() ||
          '';
        console.log('decoded token:', this.decodedToken);
        console.log('expiration date:', this.expirationDate);
        const expiresAt = moment(this.decTokenObj.exp*1000).format('YYYY-MM-DD HH:mm:ss');
        console.log('expires at:', expiresAt);
      },
      error: (err) => (this.loginValid = false),
    });
  }
}
