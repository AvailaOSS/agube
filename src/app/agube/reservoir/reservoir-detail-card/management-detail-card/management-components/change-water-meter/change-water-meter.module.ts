import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReservoirUtilsModule } from '../reservoir-utils/reservoir-utils.module';
import { ChangeWaterMeterComponent } from './change-water-meter.component';

@NgModule({
  imports: [CommonModule, ReservoirUtilsModule],
  declarations: [ChangeWaterMeterComponent],
})
export class ChangeReservoirModule {}
