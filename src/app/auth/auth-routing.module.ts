import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnableAccountComponent } from './enable-account/enable-account.component';
import { LoginComponent } from './login/login.component';
import { authEnumPaths } from './auth-enum-paths';

const routes: Routes = [
  { path: authEnumPaths.LOGIN, component: LoginComponent },
  { path: authEnumPaths.ENABLEACCOUNT, component: EnableAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
