import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReservoirUtilsModule } from '../reservoir-utils/reservoir-utils.module';
import { ChangeReservoirComponent } from './change-water-meter.component';

@NgModule({
  imports: [CommonModule, ReservoirUtilsModule],
  declarations: [ChangeReservoirComponent],
})
export class ChangeReservoirModule {}
