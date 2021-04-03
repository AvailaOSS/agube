import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsComponent } from './utils.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarModule } from 'src/app/toolbar/toolbar.module';

@NgModule({
  declarations: [UtilsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    ToolbarModule,
  ],
  exports: [UtilsComponent],
})
export class UtilsModule {}
