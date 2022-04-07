import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDwellingComponent } from './client-dwelling.component';

const routes: Routes = [{ path: '', component: ClientDwellingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientDwellingRoutingModule {}
