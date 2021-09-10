import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '@availa/table';
import { WaterMeterReadingComponent } from './water-meter-reading/water-meter-reading.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [WaterMeterReadingComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TableModule, ComponentsModule],
  exports: [WaterMeterReadingComponent],
})
export class WaterMeterModule {}
