import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeasuresComponent } from '../agube/water-meter/measures/measures.component';
import { IncidenceComponent } from './incidence/incidence.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { taskEnumPaths } from './task-enum-paths';

const routes: Routes = [
  { path: taskEnumPaths.LECTURAS, component: MeasuresComponent },
  { path: taskEnumPaths.INCIDENCE, component: IncidenceComponent },
  { path: taskEnumPaths.SCHEDULE, component: ScheduleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
