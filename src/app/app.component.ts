import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './authentication/auth.service';
import { AuthGuard } from './authentication/auth.guard';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(public authGuard: AuthGuard) {console.log('app component is created');}
}
