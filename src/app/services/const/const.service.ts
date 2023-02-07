import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstService {
  static readonly loginPage: string = 'login';
  static readonly homePage: string = 'home';
  static readonly userPage: string = 'profile';
  static readonly specialPage: string = 'special';
  constructor() {}
}
