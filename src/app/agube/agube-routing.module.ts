import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgubeRoute } from './agube-route';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { CreateDwellingComponent } from './dwelling/create-dwelling/create-dwelling.component';
import { ChangeOwnerComponent } from './dwelling/dwelling-detail-card/management-detail-card/management-components/change-owner/change-owner.component';
import { ChangePaymasterComponent } from './dwelling/dwelling-detail-card/management-detail-card/management-components/change-paymaster/change-paymaster.component';
import { ChangeResidentComponent } from './dwelling/dwelling-detail-card/management-detail-card/management-components/change-resident/change-resident.component';
import { ChangeWaterMeterComponent } from './dwelling/dwelling-detail-card/management-detail-card/management-components/change-water-meter/change-water-meter.component';
import { DwellingComponent } from './dwelling/dwelling.component';
import { CreateReservoirComponent } from './reservoir/create-reservoir/create-reservoir.component';
import { ReservoirComponent } from './reservoir/reservoir.component';

const routes: Routes = [
  // User
  {
    path: AgubeRoute.CONTROL_PANEL,
    component: ControlPanelComponent,
  },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AgubeRoutingModule {}
