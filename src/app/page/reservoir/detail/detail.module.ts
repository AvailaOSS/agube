import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservoirRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';

@NgModule({
  declarations: [DetailComponent],
  imports: [CommonModule, ReservoirRoutingModule],
})
export class DetailModule {}
