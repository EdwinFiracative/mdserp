import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { APP_SETTINGS } from '../app.settings';
import { AppComponent } from '../app.component';
import { Token } from '../token';
import { LocalStorageService } from '../services/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import moment from 'moment-timezone';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public accessToken = signal<Token>({ token: '' });
  public objToken: Token = { token: '' };
  private authUrl = inject(APP_SETTINGS).apiUrl + '/authenticate';
  isLoggedIn = computed(() => this.accessToken().token !== '');
  private jwtHelper = new JwtHelperService();
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(username: string, password: string): Observable<Token> {
    return this.http
      .put<Token>(this.authUrl, {
        email: username,
        password: password,
      })

      .pipe(
        tap((token) => {
          this.setSession(token);
        })
      );
  }

  logout() {
    console.log(this.accessToken());
    this.accessToken.set({ token: '' });
  }

  private setSession(authResult: Token) {
    this.accessToken.set(authResult);
    console.log('authResult token:', authResult);
    this.localStorageService.setItem('access_token', authResult);
  }

  getExpiration() {
    const token: Token = this.localStorageService.getItem<Token>(
      'access_token'
    ) || { token: '' };
    const expiresAt =
      this.jwtHelper.getTokenExpirationDate(token.token)?.toString() || '';
    return moment(expiresAt);
  }

  public isLoggedInFunc() {
    return moment().isBefore(this.getExpiration());
  }
}
