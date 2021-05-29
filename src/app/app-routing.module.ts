import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkInProgressComponent } from './components/work-in-progress/work-in-progress.component';
import { AgubeRoute } from './agube/agube-route';
import { MainGuard } from './main.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: AgubeRoute.CONTROL_PANEL,
    pathMatch: 'full',
    canActivate: [MainGuard],
  },
  { path: AgubeRoute.WIP, component: WorkInProgressComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
