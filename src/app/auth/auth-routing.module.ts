import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnableAccountComponent } from './enable-account/enable-account.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'enable-account/:id', component: EnableAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
