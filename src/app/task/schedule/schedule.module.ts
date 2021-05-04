import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsModule } from '../../components/components.module';
import { CalendarComponent } from './calendar/calendar.component';
import { ScheduleComponent } from './schedule.component';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    NgbDatepickerModule,
    MatIconModule,
  ],
})
export class ScheduleModule {}
