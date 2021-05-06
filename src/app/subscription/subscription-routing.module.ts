import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';
import { SubscriptionComponent } from './subscription.component';

const routes: Routes = [
  { path: '', redirectTo: '/subscription', pathMatch: 'full' }, // redirect to `SubscriptionComponent`
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'create-account', component: CreateAccountFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
