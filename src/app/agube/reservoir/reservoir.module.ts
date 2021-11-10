import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from '@availa/table';
import { ComponentsModule } from '../../components/components.module';
import { WaterMeterModule } from '../water-meter/water-meter.module';
import { CreateReservoirModule } from './create-reservoir/create-reservoir.module';
import { ReservoirManagementComponent } from './reservoir-detail-card/management-card/reservoir-management-card.component';
import { ReservoirDetailCardComponent } from './reservoir-detail-card/reservoir-detail-card.component';
import { ReservoirDetailListComponent } from './reservoir-detail-list/reservoir-detail-list.component';
import { ReservoirRoutingModule } from './reservoir-routing.module';
import { ReservoirComponent } from './reservoir.component';

@NgModule({
  declarations: [
    ReservoirComponent,
    ReservoirDetailListComponent,
    ReservoirDetailCardComponent,
    ReservoirManagementComponent,
  ],
  imports: [
    CommonModule,
    CreateReservoirModule,
    ComponentsModule,
    TableModule,
    WaterMeterModule,
    ReservoirRoutingModule,
  ],
  exports: [ReservoirComponent],
})
export class ReservoirModule {}
