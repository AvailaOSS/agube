import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeManagerComponent } from './home-manager.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix',
  },
  {
    path: '',
    component: HomeManagerComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home-manager-page/home-manager-page.module').then(
            (m) => m.HomeManagerPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeManagerRoutingModule {}
