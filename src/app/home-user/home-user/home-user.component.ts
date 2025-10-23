import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { MatToolbarRow, MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-home-user',
  imports: [RouterOutlet, MatToolbar, MatToolbarRow, MatButton, RouterLink],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent {

}
