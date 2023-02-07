import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  user: User;
  loaded: boolean = false;
  constructor(
    private apiService: ApiService,
    private authServ: AuthorizationService
  ) {}
  ngOnInit() {
    let user = this.authServ.getLoggedInUser();
    user.UserName = 'sale car';
    this.apiService.getBackUser().subscribe((res) => {
      this.user = new User();
      this.user.CurrentCulture = res.CurrentCulture;
      this.user.UserName = res.UserName;
      this.user.JobId = res.JobId;
      this.user.Permissions = res.Permissions;
      this.loaded = true;
    });
  }
}
