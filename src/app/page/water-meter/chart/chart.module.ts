import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleChartModule } from '../../../components/map/chart/google-chart.module';
import { ChartComponent } from './chart.component';

@NgModule({
  declarations: [ChartComponent],
  imports: [CommonModule, GoogleChartModule],
  exports: [ChartComponent],
})
export class ChartModule {}
