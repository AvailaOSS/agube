import { ExampleComponent } from './components/example/example.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GenericFormsComponent } from './subscription/generic-forms/generic-forms.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ContactBookComponent } from './contact-book/contact-book.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { DWellingComponent } from './dwelling/dwelling.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { ContactPanelComponent } from './contact-panel/contact-panel.component';
import { DepositPanelComponent } from './deposit-panel/deposit-panel.component';
import { AllBillsComponent } from './dwelling/dwelling-detail-card/management-components/all-bills/all-bills.component';
import { ChangePayComponent } from './dwelling/dwelling-detail-card/management-components/change-pay/change-pay.component';
import { ChangeCountComponent } from './dwelling/dwelling-detail-card/management-components/change-count/change-count.component';
import { ChangeResidentComponent } from './dwelling/dwelling-detail-card/management-components/change-resident/change-resident.component';
import { ChangeOwnerComponent } from './dwelling/dwelling-detail-card/management-components/change-owner/change-owner.component';
import { AdDWellingComponent } from './dwelling/dwelling-detail-card/management-components/add-welling/add-welling.component';
import { AddNewContactModule } from './contact-panel/contact-panel-detail-card/contact-panel-management/management-contact/add-new-contact/add-new-contact.module';
import { AddNewContactComponent } from './contact-panel/contact-panel-detail-card/contact-panel-management/management-contact/add-new-contact/add-new-contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/subscription', pathMatch: 'full' }, // redirect to `SubscriptionComponent`
  { path: 'login', component: LoginComponent },
  { path: 'control-panel', component: ControlPanelComponent },
  { path: 'viviendas', component: DWellingComponent },
  { path: 'viviendas/alta/vivienda', component: AdDWellingComponent },
  { path: 'vivienda/facturas', component: AllBillsComponent },
  { path: 'vivienda/pagador', component: ChangePayComponent },
  { path: 'vivienda/cambio/pagador', component: ChangePayComponent },
  { path: 'vivienda/cambio/contador', component: ChangeCountComponent },
  { path: 'vivienda/residente', component: ChangeResidentComponent },
  { path: 'vivienda/propietario', component: ChangeOwnerComponent },
  { path: 'contactos', component: ContactPanelComponent },
  { path: 'contactos/alta/contacto', component: AddNewContactComponent },
  { path: 'depositos', component: DepositPanelComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'contact-book', component: ContactBookComponent },
  { path: 'forms', component: GenericFormsComponent },
  { path: 'wip', component: WorkInProgressComponent },
  { path: 'example', component: ExampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
