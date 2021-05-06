import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TaskApiModule } from 'apiaux/task-rest-api-lib/src/public-api';
import { IncidenceModule } from './incidence/incidence.module';
import { CalendarComponent } from './schedule/calendar/calendar.component';
import { ScheduleModule } from './schedule/schedule.module';
import { TaskRoutingModule } from './task-routing.module';

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
    TaskApiModule,
    TaskRoutingModule
  ],
  exports: [CalendarComponent],
})
export class TaskModule {}
