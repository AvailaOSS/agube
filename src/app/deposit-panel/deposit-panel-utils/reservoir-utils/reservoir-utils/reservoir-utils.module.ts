import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservoirUtilsComponent } from './reservoir-utils.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarModule } from 'src/app/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    ToolbarModule,
  ],
  declarations: [ReservoirUtilsComponent],
  exports: [ReservoirUtilsComponent],
})
export class ReservoirUtilsModule {}
