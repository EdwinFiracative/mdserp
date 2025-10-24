import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {console.log('AuthGuard is created');}
auth = inject(AuthService);
  canActivate(): boolean {
    console.log('AuthGuard#canActivate called');
    console.log('isLoggedIn:', this.auth.isLoggedInFunc());
    if (!this.auth.isLoggedInFunc()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
