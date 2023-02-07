import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, map, catchError } from 'rxjs';
import { LoginCredentials } from 'src/app/Models/loginCredentials';
import { User } from 'src/app/Models/User';
import { ApiService } from '../api/api.service';
import { ConstService } from '../const/const.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private _accessToken: string;
  private _user: User;
  get accessToken(): string {
    return this._accessToken;
  }
  constructor(private loginApi: ApiService, private router: Router) {}

  public getToken(): string | null {
    return this._accessToken;
  }

  get isAuthorizated(): boolean {
    return !!this._accessToken;
  }

  get isAuthenticated(): boolean {
    return !!this._user;
  }

  getLoggedInUser(): User | null {
    if (this._user) {
      return JSON.parse(JSON.stringify(this._user));
    }
    return null;
  }

  initService(): void {
    this._accessToken = window.localStorage.getItem('auth-token');
  }

  setUser(): Observable<void> {
    return this.loginApi.getBackUser().pipe(
      map((res) => {
        this._user = res;
      })
    );
  }

  login(credentials: LoginCredentials): Observable<boolean> {
    return this.loginApi.login(credentials).pipe(
      tap((res) => {
        this.saveToken(res.access_token);
      }),
      map(() => true),
      catchError(async () => false)
    );
  }

  logout(): void {
    window.localStorage.removeItem(TOKEN_KEY);
    this._accessToken = null;
    this.router.navigate([`/${ConstService.loginPage}`]);
  }

  hasPrivilage(privilege: string): boolean {
    return this._user.Permissions.includes(privilege);
  }

  private saveToken(token: string): void {
    window.localStorage.setItem(TOKEN_KEY, token);
    this._accessToken = token;
  }
}
