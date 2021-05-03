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
import { DWellingManagementComponent } from './dwelling-detail-card/dwelling-management/dwelling-management.component';
import { DWellingWaterMeterReadingsComponent } from './dwelling-detail-card/dwelling-water-meter-readings/dwelling-water-meter-readings.component';
import { WaterMeterDetailCardComponent } from './dwelling-detail-card/dwelling-management/water-meter-detail-card/water-meter-detail-card.component';
import { AddDwellingModule } from './dwelling-detail-card/management-components/add-dwelling/add-dwelling.module';
import { UtilsModule } from './dwelling-detail-card/management-components/dwellingUtils/utils.module';
import { ChangePayModule } from './dwelling-detail-card/management-components/change-pay/change-pay.module';
import { ChangeCountModule } from './dwelling-detail-card/management-components/change-count/change-count.module';
import { ChangeOwnerModule } from './dwelling-detail-card/management-components/change-owner/change-owner.module';
import { ChangeResidentModule } from './dwelling-detail-card/management-components/change-resident/change-resident.module';

@NgModule({
  declarations: [
    DwellingComponent,
    DWellingDetailListComponent,
    DWellingDetailCardComponent,
    DWellingManagementComponent,
    DWellingWaterMeterReadingsComponent,
    WaterMeterDetailCardComponent,
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
    AddDwellingModule,
    ChangePayModule,
    ChangeOwnerModule,
    ChangeCountModule,
    ChangeResidentModule,
    UtilsModule,
  ],
  exports: [DwellingComponent],
})
export class DwellingModule {}
