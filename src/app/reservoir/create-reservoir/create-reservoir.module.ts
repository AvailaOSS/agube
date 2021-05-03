import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateReservoirComponent } from './create-reservoir.component';
import { ReservoirUtilsModule } from '../reservoir-detail-card/management-detail-card/management-components/reservoir-utils/reservoir-utils.module';

@NgModule({
  declarations: [CreateReservoirComponent],
  imports: [
    CommonModule,
    ReservoirUtilsModule
  ]
})
export class AddReservoirModule { }
