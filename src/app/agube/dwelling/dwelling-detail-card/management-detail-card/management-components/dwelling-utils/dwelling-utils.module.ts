import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationModule } from '@availa/notification';
import { DwellingUtilsComponent } from './dwelling-utils.component';

@NgModule({
  declarations: [DwellingUtilsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    NotificationModule,
  ],
  exports: [DwellingUtilsComponent],
})
export class DwellingUtilsModule {}
