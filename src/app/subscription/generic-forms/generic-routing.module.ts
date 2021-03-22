import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenericFormsComponent } from './generic-forms.component';
const routes: Routes = [{ path: 'forms', component: GenericFormsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
