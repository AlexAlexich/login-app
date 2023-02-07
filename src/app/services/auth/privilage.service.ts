import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ConstService } from '../const/const.service';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class PrivilageGuard implements CanActivate {
  constructor(private authServ: AuthorizationService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Get the required privilege from the route data
    const requiredPrivilege = route.data['requiredPrivilege'];
    if (!this.authServ.hasPrivilage(requiredPrivilege)) {
      this.router.navigate([`/${ConstService.homePage}`]);
      return of(false);
    }
    return of(true);
  }
}
