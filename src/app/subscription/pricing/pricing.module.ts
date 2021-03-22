import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingComponent } from './pricing.component';



@NgModule({
  declarations: [PricingComponent],
  imports: [
    CommonModule
  ],
  exports:[PricingComponent]
})
export class PricingModule { }
