import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeasuresComponent } from '../agube/water-meter/measures/measures.component';
import { IncidenceComponent } from './incidence/incidence.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  { path: 'lecturas', component: MeasuresComponent },
  { path: 'incident', component: IncidenceComponent },
  { path: 'schedule', component: ScheduleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
