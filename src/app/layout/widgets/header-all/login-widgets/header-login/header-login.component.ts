import { Component, OnInit } from '@angular/core';
import { ConstService } from 'src/app/services/const/const.service';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.css'],
})
export class HeaderLoginComponent implements OnInit {
  loginRoute = ConstService.loginPage;
  homeRoute = ConstService.homePage;
  constructor() {}

  ngOnInit() {}
}
