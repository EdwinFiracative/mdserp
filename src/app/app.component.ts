import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { APP_SETTINGS } from './app.settings';
import { MatToolbarRow, MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { AuthService } from './authentication/auth.service';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbar,
    MatToolbarRow,
    MatButton,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  settings = inject(APP_SETTINGS);
  title = 'mdserp';

  constructor(public authService: AuthService) {}

  login() {
    console.log('login');

    this.authService
      .login('edwinffr@gmail.com', 'edwinffr@gmail.com')
      .subscribe();
      console.log('tocken:', this.authService.accessToken());
  }



}
