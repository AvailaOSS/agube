import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlPanelModule } from '../control-panel/control-panel.module';
import { ChangeReservoirModule } from './reservoir-detail-card/management-detail-card/management-components/change-water-meter/change-water-meter.module';
import { ReservoirUtilsModule } from './reservoir-detail-card/management-detail-card/management-components/reservoir-utils/reservoir-utils.module';
import { ReservoirDetailCardComponent } from './reservoir-detail-card/reservoir-detail-card.component';
import { ReservoirDetailListComponent } from './reservoir-detail-list/reservoir-detail-list.component';
import { ReservoirComponent } from './reservoir.component';

@NgModule({
  declarations: [
    ReservoirComponent,
    ReservoirDetailListComponent,
    ReservoirDetailCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    ControlPanelModule,
    ChangeReservoirModule,
    ReservoirUtilsModule,
    ChangeReservoirModule,
  ],
  exports: [ReservoirComponent],
})
export class ReservoirModule {}
