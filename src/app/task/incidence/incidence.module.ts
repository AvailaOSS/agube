import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../components/components.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { IncidenceComponent } from './incidence.component';

@NgModule({
  declarations: [IncidenceComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    NgbDatepickerModule,
    ScheduleModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
  ],
})
export class IncidenceModule {}
