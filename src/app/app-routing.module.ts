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
      import('./home/home-manager/home-manager.module').then(
        (m) => m.HomeManagerModule
      ),
  },
  {
    path: 'client',
    canLoad: [UserGuard],
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./home/home-client/home-client.module').then(
        (m) => m.HomeClientModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
