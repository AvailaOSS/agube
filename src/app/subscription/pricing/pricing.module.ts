import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingComponent } from './pricing.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [PricingComponent],
  imports: [CommonModule, MatTableModule],
  exports: [PricingComponent],
})
export class PricingModule {}
