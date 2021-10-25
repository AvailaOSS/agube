import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidenceComponent, TaskRoute } from '@availa/task-fe';

const routes: Routes = [
  // Task
  {
    path: TaskRoute.INCIDENCE,
    component: IncidenceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AvailaRoutingModule {}
