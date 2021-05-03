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
import { DWellingDetailCardComponent } from './dwelling-detail-card/dwelling-detail-card.component';
import { DwellingManagementDetailCardComponent } from './dwelling-detail-card/management-detail-card/dwelling-management.component';
import { DWellingWaterMeterReadingsComponent } from './dwelling-detail-card/water-meter-readings-detail-card/dwelling-water-meter-readings-detail-card.component';
import { WaterMeterEnabledDetailCardComponent } from './dwelling-detail-card/water-meter-enabled-detail-card/water-meter-enabled-detail-card.component';
import { CreateDwellingModule } from './create-dwelling/create-dwelling.module';
import { UtilsModule } from './dwelling-detail-card/management-detail-card/management-components/dwellingUtils/utils.module';
import { ChangePayModule } from './dwelling-detail-card/management-detail-card/management-components/change-pay/change-pay.module';
import { ChangeCountModule } from './dwelling-detail-card/management-detail-card/management-components/change-count/change-count.module';
import { ChangeOwnerModule } from './dwelling-detail-card/management-detail-card/management-components/change-owner/change-owner.module';
import { ChangeResidentModule } from './dwelling-detail-card/management-detail-card/management-components/change-resident/change-resident.module';

@NgModule({
  declarations: [
    DwellingComponent,
    DWellingDetailListComponent,
    DWellingDetailCardComponent,
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
    ChangePayModule,
    ChangeOwnerModule,
    ChangeCountModule,
    ChangeResidentModule,
    UtilsModule,
  ],
  exports: [DwellingComponent],
})
export class DwellingModule {}
