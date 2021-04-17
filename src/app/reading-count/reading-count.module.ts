import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingCountComponent } from './reading-count.component';
import { ComponentsModule } from '../components/components.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReadingCountComponent],
  imports: [CommonModule, ComponentsModule],
})
export class ReadingCountModule {}
