import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './layout/pages/unauthorized-page/login-page/login-page.component';
import { HomePageComponent } from './layout/pages/authorized-page/home-page/home-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor/Interceptor.service';
import { Observable, of } from 'rxjs';
import { AuthorizationService } from './services/auth/authorization.service';
import { Router } from '@angular/router';
import { AuthorizedPageComponent } from './layout/pages/authorized-page/authorized-page.component';
import { AuthorizedHeaderComponent } from './layout/widgets/header-all/authorized-header/authorized-header.component';
import { HeaderLoginComponent } from './layout/widgets/header-all/login-widgets/header-login/header-login.component';
import { UserPageComponent } from './layout/pages/authorized-page/user-page/user-page.component';
import { LoaderComponent } from './layout/widgets/loader/loader.component';
import { SpecialPageComponent } from './layout/pages/authorized-page/special-page/special-page.component';

export function initializeApp1(authService: AuthorizationService) {
  return (): Observable<void> => {
    return of(authService.initService());
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    AuthorizedPageComponent,
    AuthorizedHeaderComponent,
    HeaderLoginComponent,
    UserPageComponent,
    LoaderComponent,
    SpecialPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp1,
      deps: [AuthorizationService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      useFactory: function (authService: AuthorizationService, router: Router) {
        return new InterceptorService(authService, router);
      },
      deps: [AuthorizationService, Router],

      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
