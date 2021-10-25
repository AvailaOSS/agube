import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgubeRoute } from './agube-route';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CreateDwellingComponent } from './dwelling/create-dwelling/create-dwelling.component';
import { ChangeOwnerComponent } from './dwelling/dwelling-detail-card/management-card/management-components/change-person/change-owner/change-owner.component';
import { ChangeResidentComponent } from './dwelling/dwelling-detail-card/management-card/management-components/change-person/change-resident/change-resident.component';
import { DwellingComponent } from './dwelling/dwelling.component';
import { CreateReservoirComponent } from './reservoir/create-reservoir/create-reservoir.component';
import { ReservoirComponent } from './reservoir/reservoir.component';
import { ChangeWaterMeterComponent } from './water-meter/change-water-meter/change-water-meter.component';

const routes: Routes = [
  // User
  { path: AgubeRoute.CONFIG, component: ConfigurationComponent },
  // Dwelling
  { path: AgubeRoute.DWELLING, component: DwellingComponent },
  { path: AgubeRoute.CREATE_DWELLING, component: CreateDwellingComponent },
  { path: AgubeRoute.CHANGE_RESIDENT, component: ChangeResidentComponent },
  { path: AgubeRoute.CHANGE_OWNER, component: ChangeOwnerComponent },
  // Reservoir
  { path: AgubeRoute.RESERVOIR, component: ReservoirComponent },
  {
    path: AgubeRoute.CREATE_RESERVOIR,
    component: CreateReservoirComponent,
  },
  // Water Meter
  {
    path: AgubeRoute.CHANGE_WATER_METER,
    component: ChangeWaterMeterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AgubeRoutingModule {}
