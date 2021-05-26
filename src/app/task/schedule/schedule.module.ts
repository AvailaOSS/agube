import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../components/components.module';
import { ScheduleComponent } from './schedule.component';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
  ],
})
export class ScheduleModule {}
