import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoute } from './page/auth/auth-route';
import { ManagerGuard } from './providers/manager.guard';
import { UserGuard } from './providers/user.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: AuthRoute.LOGIN,
    },
    {
        canLoad: [UserGuard, ManagerGuard],
        canActivate: [UserGuard, ManagerGuard],
        loadChildren: () => import('./page/home/manager/manager-page.module').then((m) => m.ManagerPageModule),
        path: 'manager',
    },
    {
        canLoad: [UserGuard],
        canActivate: [UserGuard],
        loadChildren: () => import('./page/home/client/client.module').then((m) => m.ClientModule),
        path: 'client',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
