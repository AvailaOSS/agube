import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidenceFormComponent, TaskRoute } from '@availa/task-fe';

const routes: Routes = [
  // Task
  {
    path: TaskRoute.INCIDENCE,
    component: IncidenceFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AvailaRoutingModule { }
