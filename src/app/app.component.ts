import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading: boolean = true;
  constructor() {}
  ngOnInit(): void {}
  title = 'login-app';
  onActivate(event) {
    this.loading = false;
  }
}
