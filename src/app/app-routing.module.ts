import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './components/example/example.component';
import { WorkInProgressComponent } from './components/work-in-progress/work-in-progress.component';

const routes: Routes = [
  // redirect to `SubscriptionComponent`
  { path: 'email', component: WorkInProgressComponent },
  { path: 'example', component: ExampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
