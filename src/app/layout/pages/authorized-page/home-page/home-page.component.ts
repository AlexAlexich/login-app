import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
