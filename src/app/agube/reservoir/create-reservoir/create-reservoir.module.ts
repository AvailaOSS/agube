import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateReservoirComponent } from './create-reservoir.component';
import { ReservoirUtilsModule } from '../reservoir-detail-card/management-detail-card/management-components/reservoir-utils/reservoir-utils.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CreateReservoirComponent],
  imports: [
    CommonModule,
    ReservoirUtilsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
  ],
})
export class CreateReservoirModule {}
