import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IncidenceModule } from './incidence/incidence.module';
import { ScheduleModule } from './schedule/schedule.module';
import { CalendarComponent } from './schedule/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    ScheduleModule,
    IncidenceModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [CalendarComponent],
})
export class TaskModule {}
