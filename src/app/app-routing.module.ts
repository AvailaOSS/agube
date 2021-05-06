import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlPanelComponent } from './agube/control-panel/control-panel.component';
import { CreateDwellingComponent } from './agube/dwelling/create-dwelling/create-dwelling.component';
import { ChangeOwnerComponent } from './agube/dwelling/dwelling-detail-card/management-detail-card/management-components/change-owner/change-owner.component';
import { ChangePaymasterComponent } from './agube/dwelling/dwelling-detail-card/management-detail-card/management-components/change-paymaster/change-paymaster.component';
import { ChangeResidentComponent } from './agube/dwelling/dwelling-detail-card/management-detail-card/management-components/change-resident/change-resident.component';
import { ChangeWaterMeterComponent } from './agube/dwelling/dwelling-detail-card/management-detail-card/management-components/change-water-meter/change-water-meter.component';
import { DwellingComponent } from './agube/dwelling/dwelling.component';
import { CreateReservoirComponent } from './agube/reservoir/create-reservoir/create-reservoir.component';
import { ReservoirComponent } from './agube/reservoir/reservoir.component';
import { MeasuresComponent } from './agube/water-meter/measures/measures.component';
import { ExampleComponent } from './components/example/example.component';
import { ConfigurationComponent } from './agube/configuration/configuration.component';
import { ContactBookComponent } from './contact-book/contact-book.component';
import { IncidenceComponent } from './task/incidence/incidence.component';
import { ScheduleComponent } from './task/schedule/schedule.component';
import { CreateAccountFormComponent } from './subscription/create-account-form/create-account-form.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { WorkInProgressComponent } from './components/work-in-progress/work-in-progress.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { EnableAccountComponent } from './auth/enable-account/enable-account.component';

const routes: Routes = [
  // redirect to `SubscriptionComponent`

  { path: 'config', component: ConfigurationComponent },
  { path: 'lecturas', component: MeasuresComponent },
  { path: 'incident', component: IncidenceComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'email', component: WorkInProgressComponent },
  { path: 'example', component: ExampleComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
