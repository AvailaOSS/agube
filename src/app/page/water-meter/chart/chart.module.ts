import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { GoogleChartModule } from 'src/app/components/chart/google-chart.module';

@NgModule({
  declarations: [ChartComponent],
  imports: [CommonModule, GoogleChartModule],
  exports: [ChartComponent],
})
export class ChartModule {}
