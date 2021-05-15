import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReservoirUtilsModule } from '../reservoir-detail-card/management-detail-card/management-components/reservoir-utils/reservoir-utils.module';
import { CreateReservoirComponent } from './create-reservoir.component';

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
