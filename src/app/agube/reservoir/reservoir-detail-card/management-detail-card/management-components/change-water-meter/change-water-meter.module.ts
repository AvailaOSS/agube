import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeWaterMeterComponent } from './change-water-meter.component';
import { ReservoirUtilsModule } from '../reservoir-utils/reservoir-utils.module';

@NgModule({
  imports: [CommonModule, ReservoirUtilsModule],
  declarations: [ChangeWaterMeterComponent],
})
export class ChangeReservoirModule {}
