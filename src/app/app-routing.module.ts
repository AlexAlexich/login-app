import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedPageComponent } from './layout/pages/authorized-page/authorized-page.component';
import { HomePageComponent } from './layout/pages/authorized-page/home-page/home-page.component';
import { SpecialPageComponent } from './layout/pages/authorized-page/special-page/special-page.component';
import { UserPageComponent } from './layout/pages/authorized-page/user-page/user-page.component';
import { LoginPageComponent } from './layout/pages/unauthorized-page/login-page/login-page.component';
import { AuthGuard } from './services/auth/authguard.service';
import { IsLoggedService } from './services/auth/is-logged.service';
import { PrivilageGuard } from './services/auth/privilage.service';
import { ConstService } from './services/const/const.service';

const routes: Routes = [
  {
    path: ConstService.loginPage,
    component: LoginPageComponent,
    canActivate: [IsLoggedService],
  },
  {
    path: '',
    component: AuthorizedPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: ConstService.homePage, pathMatch: 'full' },
      {
        path: ConstService.homePage,
        component: HomePageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ConstService.userPage,
        component: UserPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ConstService.specialPage,
        component: SpecialPageComponent,
        canActivate: [PrivilageGuard],
        data: {
          requiredPrivilege: 'CrossTable',
        },
      },
    ],
  },

  { path: '**', redirectTo: ConstService.homePage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
