import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { EmailComponent } from './email.component';

@NgModule({
  declarations: [EmailComponent],
  imports: [CommonModule, ComponentsModule, NgbDatepickerModule, MatIconModule],
})
export class EmailModule { }
