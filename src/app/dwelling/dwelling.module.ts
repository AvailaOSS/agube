import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DWellingComponent as DwellingComponent } from './dwelling.component';
import { MatTableModule } from '@angular/material/table';
import { ControlPanelModule } from '../control-panel/control-panel.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DWellingDetailListComponent } from './dwelling-detail-list/dwelling-detail-list.component';
import { DwellingDetailCardComponent } from './dwelling-detail-card/dwelling-detail-card.component';
import { DwellingManagementDetailCardComponent } from './dwelling-detail-card/management-detail-card/dwelling-management.component';
import { DWellingWaterMeterReadingsComponent } from './dwelling-detail-card/water-meter-readings-detail-card/dwelling-water-meter-readings-detail-card.component';
import { WaterMeterEnabledDetailCardComponent } from './dwelling-detail-card/water-meter-enabled-detail-card/water-meter-enabled-detail-card.component';
import { CreateDwellingModule } from './create-dwelling/create-dwelling.module';
import { DwellingUtilsModule } from './dwelling-detail-card/management-detail-card/management-components/dwelling-utils/dwelling-utils.module';
import { ChangePaymasterModule } from './dwelling-detail-card/management-detail-card/management-components/change-paymaster/change-paymaster.module';
import { ChangeWaterMeterModule } from './dwelling-detail-card/management-detail-card/management-components/change-water-meter/change-water-meter.module';
import { ChangeOwnerModule } from './dwelling-detail-card/management-detail-card/management-components/change-owner/change-owner.module';
import { ChangeResidentModule } from './dwelling-detail-card/management-detail-card/management-components/change-resident/change-resident.module';

@NgModule({
  declarations: [
    DwellingComponent,
    DWellingDetailListComponent,
    DwellingDetailCardComponent,
    DwellingManagementDetailCardComponent,
    DWellingWaterMeterReadingsComponent,
    WaterMeterEnabledDetailCardComponent,
  ],
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
    CreateDwellingModule,
    ChangePaymasterModule,
    ChangeOwnerModule,
    ChangeWaterMeterModule,
    ChangeResidentModule,
    DwellingUtilsModule,
  ],
  exports: [DwellingComponent],
})
export class DwellingModule {}
