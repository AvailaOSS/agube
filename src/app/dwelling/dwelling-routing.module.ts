import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgubeRoute } from '../agube-route';
import { ChangeWaterMeterComponent } from '../water-meter/change-water-meter/change-water-meter.component';
import { DwellingComponent } from './dwelling.component';

const routes: Routes = [
  {
    path: '',
    component: DwellingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DwellingRoutingModule {}
