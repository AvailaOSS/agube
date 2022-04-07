import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientConfigComponent } from './client-config.component';

const routes: Routes = [{ path: '', component: ClientConfigComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientConfigRoutingModule { }
