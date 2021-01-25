import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { GenericFormsComponent } from './subscription/generic-forms/generic-forms.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ContactBookComponent } from './contact-book/contact-book.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { LivingPlaceComponent } from './living-place/living-place.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

const routes: Routes = [
  { path: '', redirectTo: '/subscription', pathMatch: 'full' }, // redirect to `SubscriptionComponent`
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'control-panel', component: ControlPanelComponent },
  { path: 'viviendas', component: LivingPlaceComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'contact-book', component: ContactBookComponent },
  { path: 'forms', component: GenericFormsComponent },
  { path: 'wip', component: WorkInProgressComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
