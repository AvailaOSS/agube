import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { GaugeComponent } from './gauge/gauge.component';

@NgModule({
  declarations: [ChartComponent, GaugeComponent],
  imports: [CommonModule],
  exports: [GaugeComponent],
})
export class ChartModule {}
