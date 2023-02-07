import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ConstService } from '../const/const.service';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    private apiService: ApiService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!this.authorizationService.isAuthorizated) {
      this.router.navigate([`/${ConstService.loginPage}`]);
      return of(false);
    }
    if (this.authorizationService.isAuthenticated) {
      return this.validatePermission(route);
    }
    return this.authorizationService.setUser().pipe(
      map(() => {
        return true;
      })
    );
  }
  validatePermission(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredPrivilege = route.data['requiredPrivilege'];
    if (!requiredPrivilege) {
      return of(true);
    }
    if (!this.authorizationService.hasPrivilage(requiredPrivilege)) {
      this.router.navigate([`/${ConstService.homePage}`]);
      return of(false);
    }
    return of(true);
  }
}
