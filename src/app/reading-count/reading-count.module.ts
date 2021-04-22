import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingCountComponent } from './reading-count.component';
import { ComponentsModule } from '../components/components.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ReadingCountComponent],
  imports: [CommonModule, ComponentsModule, NgbDatepickerModule, MatIconModule],
})
export class ReadingCountModule {}
