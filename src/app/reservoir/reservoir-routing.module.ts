import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservoirComponent } from './reservoir.component';

const routes: Routes = [
  {
    path: '',
    component: ReservoirComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservoirRoutingModule {}
