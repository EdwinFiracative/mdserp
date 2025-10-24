import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
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
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Logs out the current user.
   * This method clears the session by resetting the access token signal to an empty string.
   */
  logout() {
    console.log(this.accessToken());
    this.accessToken.set({ token: '' });
  }

  /**
   * Sets the user session after a successful authentication.
   * This method updates the access token signal for the application's reactive state
   * and persists the token in the local storage.
   * @param authResult The authentication result object containing the access token.
   */
  private setSession(authResult: Token) {
    this.accessToken.set(authResult);
    console.log('Auth service setSession token:', authResult);
    this.localStorageService.setItem('access_token', this.accessToken());
  }

  getExpiration() {
    const token: Token = this.localStorageService.getItem<Token>(
      'access_token'
    ) || { token: '' };
    return this.jwtHelper.getTokenExpirationDate(token.token) || null;
    //  console.log('AuthService getExpiration expiresAt:', expiresAt);
    //return moment(expiresAt);
  }

  public isLoggedInFunc() {
    const expiration = this.getExpiration();
    if (expiration === null) {
      return false;
    }
    return moment().isBefore(moment(expiration));
  }

  private handleError(error: HttpErrorResponse) {
    let message = '';
    switch (error.status) {
      case 0:
        message = 'Client error';
        break;
      case HttpStatusCode.InternalServerError:
        message = 'Server error';
        break;
      case HttpStatusCode.BadRequest:
        message = 'Request error';
        break;
      case HttpStatusCode.Unauthorized:
          message = 'Unauthorized';
      break;
      case HttpStatusCode.Forbidden:
        message = 'Forbidden';
        break;
      case HttpStatusCode.NotFound:
        message = 'Not found';
        break;
      case HttpStatusCode.TooManyRequests:
        message = 'Too many requests';
        break;
      default:
        message = 'Unknown error';
    }
    console.error(message, error.error);
    return throwError(() => error);
  }
}
