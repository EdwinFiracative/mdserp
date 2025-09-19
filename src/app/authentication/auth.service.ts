import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { APP_SETTINGS } from '../app.settings';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public accessToken = signal('');
  private authUrl = inject(APP_SETTINGS).apiUrl + '/authenticate';
  isLoggedIn = computed(() => this.accessToken() !== '');

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http
      .put<string>(this.authUrl, {
        email: username,
        password: password
      })
      .pipe(tap((token) => this.accessToken.set(token)));

  }

  logout() {
    console.log(this.accessToken());
    this.accessToken.set('');
  }
}
