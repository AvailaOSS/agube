import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChangePaymasterComponent } from './change-paymaster.component';
import { NotificationModule } from '@availa/notification';

@NgModule({
  declarations: [ChangePaymasterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    NotificationModule
  ],
})
export class ChangePaymasterModule {}
