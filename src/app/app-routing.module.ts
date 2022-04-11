import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoute } from '@availa/auth-fe';
import { ManagerGuard } from './providers/manager.guard';
import { UserGuard } from './providers/user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: AuthRoute.LOGIN,
    pathMatch: 'full',
  },
  {
    path: 'manager',
    canLoad: [UserGuard, ManagerGuard],
    canActivate: [UserGuard, ManagerGuard],
    loadChildren: () =>
      import('./page/home/manager/manager-page.module').then(
        (m) => m.ManagerPageModule
      ),
  },
  {
    path: 'client',
    canLoad: [UserGuard],
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./page/home/client/client.module').then((m) => m.ClientModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
