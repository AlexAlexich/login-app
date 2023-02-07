import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, takeUntil, tap } from 'rxjs';
import { CommonComponent } from 'src/app/Models/CommonComponent/common.component';
import { LoginCredentials } from 'src/app/Models/loginCredentials';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { ConstService } from 'src/app/services/const/const.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends CommonComponent implements OnInit {
  password: string;
  username: string;
  userEmpty: boolean = false;
  passEmpty: boolean = false;
  loginInvalid: boolean = false;

  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {}
  login() {
    this.checkUsername();
    this.checkPassword();
    if (this.passEmpty || this.userEmpty) {
      return;
    }
    let credentials: LoginCredentials = new LoginCredentials();
    credentials.username = this.username;
    credentials.password = this.password;
    this.authService
      .login(credentials)
      .pipe(
        tap((res) => {
          this.loginInvalid = !res;
          if (res) {
           
          }
        })
      )
      .subscribe();
  }

  checkUsername(): void {
    if (!this.username || this.username.length <= 3) {
      this.userEmpty = true;
      return;
    }
    this.userEmpty = false;
  }
  checkPassword() {
    if (!this.password || this.password.length <= 3) {
      this.passEmpty = true;
      return;
    }
    this.passEmpty = false;
  }
}
