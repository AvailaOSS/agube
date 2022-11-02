import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoute } from './auth-route';
import { EnableAccountComponent } from './enable-account/enable-account.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        component: LoginComponent,
        path: AuthRoute.LOGIN,
    },
    {
        component: EnableAccountComponent,
        path: AuthRoute.ENABLE_ACCOUNT,
    },
    {
        component: ResetPasswordComponent,
        path: AuthRoute.RESET_PASSWORD,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
