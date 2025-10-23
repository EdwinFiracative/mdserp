import { Component, inject } from '@angular/core';
import { APP_SETTINGS } from '../../app.settings';
import { MatToolbarRow, MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatToolbar, MatToolbarRow],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  settings = inject(APP_SETTINGS);
  title = 'mdserp';
  router = inject(Router);

  login() {
    this.router.navigate(['/login']);
    console.log('login');
  }
}
