import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create.component';
import { GeolocationComponent } from './geolocation/geolocation.component';

const routes: Routes = [
  {
    path: '',
    component: CreateComponent,
  },
  {
    path: 'geolocation',
    component: GeolocationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRoutingModule {}
