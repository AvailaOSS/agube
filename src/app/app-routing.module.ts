import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './components/example/example.component';
import { WorkInProgressComponent } from './components/work-in-progress/work-in-progress.component';
import { SubscriptionRoute } from './subscription/subscription-route';

const routes: Routes = [
  { path: '', redirectTo: SubscriptionRoute.SUBSCRIPTION, pathMatch: 'full' },
  { path: 'email', component: WorkInProgressComponent },
  { path: 'example', component: ExampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
