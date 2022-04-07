import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDwellingRoutingModule } from './client-dwelling-routing.module';
import { ClientDwellingComponent } from './client-dwelling.component';


@NgModule({
  declarations: [
    ClientDwellingComponent
  ],
  imports: [
    CommonModule,
    ClientDwellingRoutingModule
  ]
})
export class ClientDwellingModule { }
