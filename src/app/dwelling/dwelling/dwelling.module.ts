import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DwellingRoutingModule } from './dwelling-routing.module';
import { DwellingComponent } from './dwelling.component';


@NgModule({
  declarations: [
    DwellingComponent
  ],
  imports: [
    CommonModule,
    DwellingRoutingModule
  ]
})
export class DwellingModule { }
