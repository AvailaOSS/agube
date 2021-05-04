import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnableAccountComponent } from './auth/enable-account/enable-account.component';
import { LoginComponent } from './auth/login/login.component';
import { ExampleComponent } from './components/example/example.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ContactBookComponent } from './contact-book/contact-book.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { CreateDwellingComponent } from './dwelling/create-dwelling/create-dwelling.component';
import { ChangeOwnerComponent } from './dwelling/dwelling-detail-card/management-detail-card/management-components/change-owner/change-owner.component';
import { ChangePaymasterComponent } from './dwelling/dwelling-detail-card/management-detail-card/management-components/change-paymaster/change-paymaster.component';
import { ChangeResidentComponent } from './dwelling/dwelling-detail-card/management-detail-card/management-components/change-resident/change-resident.component';
import { ChangeWaterMeterComponent } from './dwelling/dwelling-detail-card/management-detail-card/management-components/change-water-meter/change-water-meter.component';
import { DWellingComponent } from './dwelling/dwelling.component';
import { EmailComponent } from './email/email.component';
import { IncidentComponent } from './incident/incident.component';
import { ReadingCountComponent } from './reading-count/reading-count.component';
import { CreateReservoirComponent } from './reservoir/create-reservoir/create-reservoir.component';
import { ReservoirComponent } from './reservoir/reservoir.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CreateAccountFormComponent } from './subscription/create-account-form/create-account-form.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

const routes: Routes = [
  { path: '', redirectTo: '/subscription', pathMatch: 'full' }, // redirect to `SubscriptionComponent`
  { path: 'login', component: LoginComponent },
  { path: 'control-panel', component: ControlPanelComponent },
  { path: 'viviendas', component: DWellingComponent },
  { path: 'viviendas/alta/vivienda', component: CreateDwellingComponent },
  { path: 'vivienda/pagador', component: ChangePaymasterComponent },
  { path: 'vivienda/cambio/pagador', component: ChangePaymasterComponent },
  { path: 'vivienda/cambio/contador', component: ChangeWaterMeterComponent },
  { path: 'vivienda/residente', component: ChangeResidentComponent },
  { path: 'vivienda/propietario', component: ChangeOwnerComponent },
  { path: 'depositos', component: ReservoirComponent },
  { path: 'deposit/changeReservoir', component: ChangeWaterMeterComponent },
  { path: 'depositos/alta/deposito', component: CreateReservoirComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'contact-book', component: ContactBookComponent },
  { path: 'config', component: ConfigurationComponent },
  { path: 'create-account', component: CreateAccountFormComponent },
  { path: 'lecturas', component: ReadingCountComponent },
  { path: 'incident', component: IncidentComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'email', component: EmailComponent },
  { path: 'wip', component: WorkInProgressComponent },
  { path: 'example', component: ExampleComponent },
  { path: 'enable-account/:id', component: EnableAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
