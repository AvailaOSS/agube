import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeWaterMeterComponent } from './change-water-meter.component';
import { DwellingUtilsModule } from '../../management-detail-card/management-components/dwelling-utils/dwelling-utils.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationModule } from '@availa/notification';

@NgModule({
  declarations: [ChangeWaterMeterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    NotificationModule,
  ],
})
export class ChangeWaterMeterModule {}
