import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerConfigComponent } from './manager-config.component';

const routes: Routes = [{ path: '', component: ManagerConfigComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerConfigRoutingModule { }
