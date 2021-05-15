import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';
import { SubscriptionRoute } from './subscription-route';
import { SubscriptionComponent } from './subscription.component';

const routes: Routes = [
  {
    path: SubscriptionRoute.SUBSCRIPTION,
    component: SubscriptionComponent,
  },
  {
    path: SubscriptionRoute.CREATE_ACCOUNT,
    component: CreateAccountFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
