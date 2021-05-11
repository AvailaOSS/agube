import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DwellingComponent as DwellingComponent } from './dwelling.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DwellingDetailListComponent } from './dwelling-detail-list/dwelling-detail-list.component';
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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    DwellingComponent,
    DwellingDetailListComponent,
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
    CreateDwellingModule,
    ChangePaymasterModule,
    ChangeOwnerModule,
    ChangeWaterMeterModule,
    ChangeResidentModule,
    DwellingUtilsModule,
    Ng2SearchPipeModule,
  ],
  exports: [DwellingComponent],
})
export class DwellingModule {}
