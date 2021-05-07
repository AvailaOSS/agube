import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';
import { SubscriptionEnumPaths } from './subscription-enum-paths';
import { SubscriptionComponent } from './subscription.component';

const routes: Routes = [
  { path: '', redirectTo: '/subscription', pathMatch: 'full' }, // redirect to `SubscriptionComponent`
  {
    path: SubscriptionEnumPaths.SUBSCRIPTION,
    component: SubscriptionComponent,
  },
  {
    path: SubscriptionEnumPaths.CREATEACCOUNT,
    component: CreateAccountFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
