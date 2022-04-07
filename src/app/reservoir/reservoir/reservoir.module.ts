import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservoirRoutingModule } from './reservoir-routing.module';
import { ReservoirComponent } from './reservoir.component';


@NgModule({
  declarations: [
    ReservoirComponent
  ],
  imports: [
    CommonModule,
    ReservoirRoutingModule
  ]
})
export class ReservoirModule { }
