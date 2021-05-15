import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoute } from './auth-route';
import { EnableAccountComponent } from './enable-account/enable-account.component';
import { LoginGuard } from './login/helpers/login.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: AuthRoute.LOGIN,
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  { path: AuthRoute.ENABLE_ACCOUNT, component: EnableAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
