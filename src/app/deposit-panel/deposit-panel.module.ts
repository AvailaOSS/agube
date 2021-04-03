import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositPanelComponent } from './deposit-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ControlPanelModule } from '../control-panel/control-panel.module';
import { DepositPanelDetailListComponent } from './deposit-panel-detail-list/deposit-panel-detail-list.component';
import { DepositPanelDetailCardComponent } from './deposit-panel-detail-card/deposit-panel-detail-card.component';
import { ReservoirUtilsModule } from './deposit-panel-management/reservoir-utils/reservoir-utils/reservoir-utils.module';
import { AddReservoirModule } from './deposit-panel-management/add-reservoir/addReservoir/addReservoir.module';

@NgModule({
  declarations: [
    DepositPanelComponent,
    DepositPanelDetailListComponent,
    DepositPanelDetailCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    ControlPanelModule,
    AddReservoirModule,
    ReservoirUtilsModule,
  ],
  exports: [DepositPanelComponent],
})
export class DepositPanelModule {}
