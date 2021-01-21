import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingComponent } from './pricing.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [PricingComponent],
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, FlexLayoutModule],
  exports: [PricingComponent],
})
export class PricingModule {}
