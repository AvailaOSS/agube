import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoute } from '@availa/auth-fe';
import { AgubeRoute } from './agube/agube-route';
import { AgubeModule } from './agube/agube.module';
import { WorkInProgressComponent } from './components/work-in-progress/work-in-progress.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: AuthRoute.LOGIN },
  { path: AgubeRoute.WIP, component: WorkInProgressComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AgubeModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
