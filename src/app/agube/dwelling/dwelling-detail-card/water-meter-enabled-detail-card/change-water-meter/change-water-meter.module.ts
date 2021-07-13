import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeWaterMeterComponent } from './change-water-meter.component';
import { DwellingUtilsModule } from '../../management-detail-card/management-components/dwelling-utils/dwelling-utils.module';

@NgModule({
  declarations: [ChangeWaterMeterComponent],
  imports: [CommonModule, DwellingUtilsModule],
})
export class ChangeWaterMeterModule {}
