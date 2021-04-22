import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentComponent } from './incident.component';
import { ComponentsModule } from '../components/components.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [IncidentComponent],
  imports: [CommonModule, ComponentsModule, NgbDatepickerModule, MatIconModule],
})
export class IncidentModule {}
