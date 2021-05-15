import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../../components/components.module';
import { MeasuresComponent } from './measures.component';

@NgModule({
  declarations: [MeasuresComponent],
  imports: [CommonModule, ComponentsModule, NgbDatepickerModule, MatIconModule],
})
export class MeasuresModule {}
