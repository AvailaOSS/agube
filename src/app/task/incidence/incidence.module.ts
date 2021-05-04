import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
    ScheduleModule,
  ],
})
export class IncidenceModule {}
