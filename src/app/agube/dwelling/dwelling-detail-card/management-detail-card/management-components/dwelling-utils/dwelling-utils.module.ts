import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DwellingUtilsComponent } from './dwelling-utils.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarModule } from 'src/app/toolbar/toolbar.module';

@NgModule({
  declarations: [DwellingUtilsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    ToolbarModule,
  ],
  exports: [DwellingUtilsComponent],
})
export class DwellingUtilsModule {}
