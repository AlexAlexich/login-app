import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AuthorizationService } from '../auth/authorization.service';
import { ConstService } from '../const/const.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.authService.logout();
      return of(err.message);
    }
    return of(err);
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.accessToken) {
      const httpRequest = req.clone({
        headers: new HttpHeaders({
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
          Authorization: `Bearer ${this.authService.accessToken}`,
        }),
      });
      return next
        .handle(httpRequest)
        .pipe(catchError((x) => this.handleAuthError(x)));
    }
    return next.handle(req).pipe(catchError((x) => this.handleAuthError(x)));
  }
}
