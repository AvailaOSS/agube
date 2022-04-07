import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerReservoirComponent } from './manager-reservoir.component';

const routes: Routes = [
  { path: '', component: ManagerReservoirComponent },
  {
    path: 'create',
    loadChildren: () =>
      import('../create/create.module').then((m) => m.CreateModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerReservoirRoutingModule {}
