import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositPanelComponent } from './deposit-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ControlPanelModule } from '../control-panel/control-panel.module';
import { MatCardModule } from '@angular/material/card';
import { DepositPanelDetailListComponent } from './deposit-panel-detail-list/deposit-panel-detail-list.component';
import { DepositPanelDetailCardComponent } from './deposit-panel-detail-card/deposit-panel-detail-card.component';
import { ToolbarModule } from '../menu/toolbar.module';



@NgModule({
  declarations: [DepositPanelComponent, DepositPanelDetailListComponent, DepositPanelDetailCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    ControlPanelModule,
    MatCardModule,
    ToolbarModule
  ],
  exports: [DepositPanelComponent],
})
export class DepositPanelModule { }
