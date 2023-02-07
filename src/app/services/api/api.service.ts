import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoginCredentials } from 'src/app/Models/loginCredentials';
import { User } from 'src/app/Models/User';

const AUTH_API = 'https://bcd-api.procampaign.com/auth/';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(
      AUTH_API + 'Token',
      `grant_type=password&password=${encodeURIComponent(
        credentials.password
      )}&username=${encodeURIComponent(credentials.username)}`
    );
  }
  getBackUser(): Observable<User> {
    return this.http.get<any>(AUTH_API + 'userInfo').pipe(
      map((res) => {
        console.log(res);
        return {
          CurrentCulture: res.Data.CurrentCulture,
          UserName: res.Data.UserName,
          JobId: res.JobId,
          Permissions: res.Data.Privileges,
        };
      })
    );
  }
}
