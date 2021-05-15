import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgubeEnumPaths } from './agube-enum-paths';
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
    path: AgubeEnumPaths.CONTROL_PANEL,
    component: ControlPanelComponent,
  },
  { path: AgubeEnumPaths.CONFIG, component: ConfigurationComponent },
  // Dwelling
  { path: AgubeEnumPaths.DWELLING, component: DwellingComponent },
  { path: AgubeEnumPaths.CREATE_DWELLING, component: CreateDwellingComponent },
  {
    path: AgubeEnumPaths.CHANGE_PAYMASTER,
    component: ChangePaymasterComponent,
  },
  { path: AgubeEnumPaths.CHANGE_RESIDENT, component: ChangeResidentComponent },
  { path: AgubeEnumPaths.CHANGE_OWNER, component: ChangeOwnerComponent },
  {
    path: AgubeEnumPaths.CHANGE_WATER_METER,
    component: ChangeWaterMeterComponent,
  },
  // Reservoir
  { path: AgubeEnumPaths.RESERVOIR, component: ReservoirComponent },
  {
    path: AgubeEnumPaths.CREATE_RESERVOIR,
    component: CreateReservoirComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AgubeRoutingModule {}
