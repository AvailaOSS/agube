import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeasuresComponent } from '../agube/water-meter/measures/measures.component';
import { IncidenceComponent } from './incidence/incidence.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TaskRoute } from './task-route';

const routes: Routes = [
  { path: TaskRoute.READING, component: MeasuresComponent },
  { path: TaskRoute.INCIDENCE, component: IncidenceComponent },
  { path: TaskRoute.SCHEDULE, component: ScheduleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
