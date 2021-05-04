import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReservoirUtilsComponent } from './reservoir-utils.component';

@NgModule({
  declarations: [ReservoirUtilsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
  ],
  exports: [ReservoirUtilsComponent],
})
export class ReservoirUtilsModule {}
