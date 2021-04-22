import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { ScheduleComponent } from './schedule.component';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [CommonModule, ComponentsModule, NgbDatepickerModule, MatIconModule],
})
export class ScheduleModule {}
