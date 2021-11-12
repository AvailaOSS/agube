import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubRouterComponent } from './sub-router.component';


const routes: Routes = [
  {
    path: '',
    component: SubRouterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubRouterRoutingModule {}
