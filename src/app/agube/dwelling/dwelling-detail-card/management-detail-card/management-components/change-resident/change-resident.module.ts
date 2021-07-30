import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChangeResidentComponent } from './change-resident.component';
import { NotificationModule } from '@availa/notification';

@NgModule({
  declarations: [ChangeResidentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    NotificationModule
  ],
})
export class ChangeResidentModule {}
