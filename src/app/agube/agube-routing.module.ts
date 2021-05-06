import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { ChangeReservoirModule } from './reservoir/reservoir-detail-card/management-detail-card/management-components/change-water-meter/change-water-meter.module';

const routes: Routes = [
  // redirect to `SubscriptionComponent`
  { path: 'control-panel', component: ControlPanelComponent },
  { path: 'viviendas', component: DwellingComponent },
  { path: 'viviendas/alta/vivienda', component: CreateDwellingComponent },
  { path: 'vivienda/cambio/pagador', component: ChangePaymasterComponent },
  { path: 'vivienda/cambio/contador', component: ChangeWaterMeterComponent },
  { path: 'vivienda/residente', component: ChangeResidentComponent },
  { path: 'vivienda/propietario', component: ChangeOwnerComponent },

  { path: 'config', component: ConfigurationComponent },

  { path: 'depositos', component: ReservoirComponent },
  { path: 'deposit/changeReservoir', component: ChangeWaterMeterComponent },
  { path: 'depositos/alta/deposito', component: CreateReservoirComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AgubeRoutingModule {}
