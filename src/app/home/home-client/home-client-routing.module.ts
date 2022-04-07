import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeClientComponent } from './home-client.component';

const routes: Routes = [
  {
    path: '',
    component: HomeClientComponent,
    children: [
      {
        path: '',
        redirectTo: 'dwellings',
        pathMatch: 'prefix',
      },
      {
        path: 'dwellings',
        loadChildren: () =>
          import('../../dwelling/client-dwelling/client-dwelling.module').then(
            (m) => m.ClientDwellingModule
          ),
      },
      {
        path: 'config',
        loadChildren: () =>
          import('../../config/client-config/client-config.module').then(
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
export class HomeClientRoutingModule {}
