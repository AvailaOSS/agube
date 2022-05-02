import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaugeComponent } from './gauge.component';
import { ChartModule } from 'src/app/components/chart/chart.module';

@NgModule({
  declarations: [GaugeComponent],
  imports: [CommonModule, ChartModule],
  exports: [GaugeComponent],
})
export class GaugeModule {}
