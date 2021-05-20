import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DwellingUtilsComponent } from './dwelling-utils.component';
import { NotificationsModule } from '../../../../../../components/notifications/notifications.module';

@NgModule({
  declarations: [DwellingUtilsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    NotificationsModule
  ],
  exports: [DwellingUtilsComponent],
})
export class DwellingUtilsModule {}
