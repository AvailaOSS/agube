import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkInProgressComponent } from './components/work-in-progress/work-in-progress.component';
import { AgubeRoute } from './agube/agube-route';
import { AuthRoute } from '@availa/auth-fe';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: AuthRoute.LOGIN },
  { path: AgubeRoute.WIP, component: WorkInProgressComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
