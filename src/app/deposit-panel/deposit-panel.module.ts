import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositPanelComponent } from './deposit-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ControlPanelModule } from '../control-panel/control-panel.module';
import { DepositPanelDetailListComponent } from './deposit-panel-detail-list/deposit-panel-detail-list.component';
import { DepositPanelDetailCardComponent } from './deposit-panel-detail-card/deposit-panel-detail-card.component';
import { ReservoirUtilsModule } from './deposit-panel-utils/reservoir-utils/reservoir-utils/reservoir-utils.module';
import { AddReservoirModule } from './deposit-panel-utils/add-reservoir/addReservoir/addReservoir.module';
import { DepositManagementComponent } from './deposit-panel-detail-card/deposit-management/deposit-management/deposit-management.component';
import { ChangeReservoirModule } from './deposit-panel-utils/change-reservoir/change-reservoir.module';

@NgModule({
  declarations: [
    DepositPanelComponent,
    DepositPanelDetailListComponent,
    DepositPanelDetailCardComponent,
    DepositManagementComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    ControlPanelModule,
    AddReservoirModule,
    ReservoirUtilsModule,
    ChangeReservoirModule
  ],
  exports: [DepositPanelComponent],
})
export class DepositPanelModule {}
