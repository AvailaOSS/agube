import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LivingPlaceComponent } from './living-place.component';
import { MatTableModule } from '@angular/material/table';
import { ControlPanelModule } from '../control-panel/control-panel.module';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatTableModule,ControlPanelModule],
  declarations: [LivingPlaceComponent],
})
export class LivingPlaceModule {}
