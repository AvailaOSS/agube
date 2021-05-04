import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDwellingComponent } from './create-dwelling.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DwellingUtilsModule } from '../dwelling-detail-card/management-detail-card/management-components/dwelling-utils/dwelling-utils.module';

@NgModule({
  declarations: [CreateDwellingComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    DwellingUtilsModule,
  ],
})
export class CreateDwellingModule {}
