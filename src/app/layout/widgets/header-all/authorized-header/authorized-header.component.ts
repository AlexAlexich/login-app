import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { ConstService } from 'src/app/services/const/const.service';

@Component({
  selector: 'app-authorized-header',
  templateUrl: './authorized-header.component.html',
  styleUrls: ['./authorized-header.component.scss'],
})
export class AuthorizedHeaderComponent implements OnInit {
  loginRoute = ConstService.loginPage;
  homeRoute = ConstService.homePage;
  profile = ConstService.userPage;
  special = ConstService.specialPage;
  user: User;
  constructor(
    private authorizationService: AuthorizationService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.user = this.authorizationService.getLoggedInUser();
  }
  logout() {
    this.authorizationService.logout();
  }
}
