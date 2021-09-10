import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewWaterFormComponent } from './new-water-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '@availa/table';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [NewWaterFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TableModule, ComponentsModule],
  exports: [NewWaterFormComponent],
})
export class NewWaterFormModule {}
