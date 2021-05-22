import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../components/components.module';
import { ScheduleComponent } from './schedule.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskModule } from '../task.module';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    NgbDatepickerModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
})
export class ScheduleModule {}
