import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DwellingComponent } from './dwelling.component';

const routes: Routes = [{ path: '', component: DwellingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DwellingRoutingModule { }
