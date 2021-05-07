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
import { agubeEnumPaths } from './agube-enum-paths';

const routes: Routes = [
  // redirect to `SubscriptionComponent`
  { path: agubeEnumPaths.CONTROLPANEL, component: ControlPanelComponent },
  { path: agubeEnumPaths.DWELLING, component: DwellingComponent },
  { path: agubeEnumPaths.CREATEDWELLING, component: CreateDwellingComponent },
  { path: agubeEnumPaths.CHANGEPAYMASTER, component: ChangePaymasterComponent },
  { path: agubeEnumPaths.CHANGEWATERMETER, component: ChangeWaterMeterComponent },
  { path: agubeEnumPaths.CHANGERESIDENT, component: ChangeResidentComponent },
  { path: agubeEnumPaths.CHANGEOWNER, component: ChangeOwnerComponent },

  { path: agubeEnumPaths.CONFIG, component: ConfigurationComponent },

  { path: agubeEnumPaths.RESERVOIR, component: ReservoirComponent },
  { path: agubeEnumPaths.CHANGEWATERMETER, component: ChangeWaterMeterComponent },
  { path: agubeEnumPaths.CREATERESERVOIR, component: CreateReservoirComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AgubeRoutingModule {}
