import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ChartComponent],
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
  exports: [ChartComponent],
})
export class ChartModule {}
