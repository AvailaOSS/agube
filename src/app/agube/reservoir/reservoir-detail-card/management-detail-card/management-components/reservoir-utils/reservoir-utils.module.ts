import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReservoirUtilsComponent } from './reservoir-utils.component';
import { NotificationModule } from '@availa/notification';

@NgModule({
  declarations: [ReservoirUtilsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NotificationModule
  ],
  exports: [ReservoirUtilsComponent],
})
export class ReservoirUtilsModule {}
