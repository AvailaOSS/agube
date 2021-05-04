import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasuresComponent } from './measures.component';
import { ComponentsModule } from '../../../components/components.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MeasuresComponent],
  imports: [CommonModule, ComponentsModule, NgbDatepickerModule, MatIconModule],
})
export class MeasuresModule {}
