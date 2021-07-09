import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewWaterFormComponent } from './new-water-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '@availa/table';

@NgModule({
  declarations: [NewWaterFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TableModule],
  exports: [NewWaterFormComponent],
})
export class NewWaterFormModule {}
