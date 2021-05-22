import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../components/components.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { IncidenceComponent } from './incidence.component';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  declarations: [IncidenceComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    NgbDatepickerModule,
    MatIconModule,
    ScheduleModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
})
export class IncidenceModule {}
