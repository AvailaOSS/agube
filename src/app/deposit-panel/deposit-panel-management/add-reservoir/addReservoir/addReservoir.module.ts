import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReservoirComponent } from './addReservoir.component';
import { ReservoirUtilsModule } from '../../reservoir-utils/reservoir-utils/reservoir-utils.module';


@NgModule({
  declarations: [AddReservoirComponent],
  imports: [
    CommonModule,
    ReservoirUtilsModule
  ]
})
export class AddReservoirModule { }
