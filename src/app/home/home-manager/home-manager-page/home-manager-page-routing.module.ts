import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeManagerPageComponent } from './home-manager-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeManagerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'dwellings',
        pathMatch: 'prefix',
      },
      {
        path: 'dwellings',
        loadChildren: () =>
          import(
            '../../../dwelling/manager-dwelling/manager-dwelling.module'
          ).then((m) => m.ManagerDwellingModule),
      },
      {
        path: 'reservoirs',
        loadChildren: () =>
          import(
            '../../../reservoir/manager-reservoir/manager-reservoir.module'
          ).then((m) => m.ManagerReservoirModule),
      },
      {
        path: 'config',
        loadChildren: () =>
          import('../../../config/manager-config/manager-config.module').then(
            (m) => m.ManagerConfigModule
          ),
      },
      {
        path: 'client/dwellings',
        loadChildren: () =>
          import('../../../dwelling/client-dwelling/client-dwelling.module').then(
            (m) => m.ClientDwellingModule
          ),
      },
      {
        path: 'client/config',
        loadChildren: () =>
          import('../../../config/client-config/client-config.module').then(
            (m) => m.ClientConfigModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeManagerPageRoutingModule {}
