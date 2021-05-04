import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarModule } from 'src/app/toolbar/toolbar.module';
import { ReservoirUtilsComponent } from './reservoir-utils.component';

@NgModule({
  declarations: [ReservoirUtilsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    ToolbarModule,
  ],
  exports: [ReservoirUtilsComponent],
})
export class ReservoirUtilsModule {}
