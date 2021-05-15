import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './components/example/example.component';
import { WorkInProgressComponent } from './components/work-in-progress/work-in-progress.component';
import { MainGuard } from './main.guard';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  { path: '', component: SubscriptionComponent, canActivate: [MainGuard] },
  { path: '**', redirectTo: '' },
  { path: 'email', component: WorkInProgressComponent },
  { path: 'example', component: ExampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
