import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgubeRoute } from './agube-route';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CreateDwellingComponent } from './dwelling/create-dwelling/create-dwelling.component';
import { ChangeOwnerComponent } from './dwelling/dwelling-detail-card/management-detail-card/management-components/change-owner/change-owner.component';
import { ChangePaymasterComponent } from './dwelling/dwelling-detail-card/management-detail-card/management-components/change-paymaster/change-paymaster.component';
import { ChangeResidentComponent } from './dwelling/dwelling-detail-card/management-detail-card/management-components/change-resident/change-resident.component';
import { ChangeWaterMeterComponent } from './dwelling/dwelling-detail-card/water-meter-enabled-detail-card/change-water-meter/change-water-meter.component';
import { DwellingComponent } from './dwelling/dwelling.component';
import { CreateReservoirComponent } from './reservoir/create-reservoir/create-reservoir.component';
import { ChangeReservoirComponent } from './reservoir/reservoir-detail-card/water-meter-enable-detail-card/change-water-meter/change-water-meter.component';
import { ReservoirComponent } from './reservoir/reservoir.component';

const routes: Routes = [
  // User

  { path: AgubeRoute.CONFIG, component: ConfigurationComponent },
  // Dwelling
  { path: AgubeRoute.DWELLING, component: DwellingComponent },
  { path: AgubeRoute.CREATE_DWELLING, component: CreateDwellingComponent },
  {
    path: AgubeRoute.CHANGE_PAYMASTER,
    component: ChangePaymasterComponent,
  },
  { path: AgubeRoute.CHANGE_RESIDENT, component: ChangeResidentComponent },
  { path: AgubeRoute.CHANGE_OWNER, component: ChangeOwnerComponent },
  {
    path: AgubeRoute.CHANGE_WATER_METER,
    component: ChangeWaterMeterComponent,
  },
  // Reservoir
  { path: AgubeRoute.RESERVOIR, component: ReservoirComponent },
  {
    path: AgubeRoute.CREATE_RESERVOIR,
    component: CreateReservoirComponent,
  },
  {
    path: AgubeRoute.CHANGE_RESERVOIR,
    component: ChangeReservoirComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AgubeRoutingModule { }
