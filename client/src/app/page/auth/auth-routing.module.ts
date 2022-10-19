import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoute } from './auth-route';
import { EnableAccountComponent } from './enable-account/enable-account.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: AuthRoute.LOGIN,
        component: LoginComponent,
    },
    {
        path: AuthRoute.ENABLE_ACCOUNT,
        component: EnableAccountComponent,
    },
    {
        path: AuthRoute.RESET_PASSWORD,
        component: ResetPasswordComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
