import { DwellingResidentDetailCard } from './dwelling-detail-card/management-detail-card/dwelling-resident-detail-card.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// MDB Angular Free
import { CreateDwellingModule } from './create-dwelling/create-dwelling.module';
import { DwellingDetailCardComponent } from './dwelling-detail-card/dwelling-detail-card.component';

import { ChangeOwnerModule } from './dwelling-detail-card/management-detail-card/management-components/change-owner/change-owner.module';
import { ChangePaymasterModule } from './dwelling-detail-card/management-detail-card/management-components/change-paymaster/change-paymaster.module';
import { ChangeResidentModule } from './dwelling-detail-card/management-detail-card/management-components/change-resident/change-resident.module';
import { DwellingUtilsModule } from './dwelling-detail-card/management-detail-card/management-components/dwelling-utils/dwelling-utils.module';
import { WaterMeterEnabledDetailCardComponent } from './dwelling-detail-card/water-meter-enabled-detail-card/water-meter-enabled-detail-card.component';
import { DWellingWaterMeterReadingsComponent } from './dwelling-detail-card/water-meter-readings-detail-card/dwelling-water-meter-readings-detail-card.component';
import { DwellingDetailListComponent } from './dwelling-detail-list/dwelling-detail-list.component';
import { DwellingComponent } from './dwelling.component';
import { ComponentsModule } from '../../components/components.module';
import { TableModule } from '@availa/table';
import { NewWaterFormModule } from '../new-water-meter-form/new-water-form/new-water-form.module';
import { ChangeWaterMeterModule } from './dwelling-detail-card/water-meter-enabled-detail-card/change-water-meter/change-water-meter.module';

@NgModule({
  declarations: [
    DwellingComponent,
    DwellingDetailListComponent,
    DwellingDetailCardComponent,
    DwellingResidentDetailCard,
    DWellingWaterMeterReadingsComponent,
    WaterMeterEnabledDetailCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CreateDwellingModule,
    ChangePaymasterModule,
    ChangeOwnerModule,
    ChangeWaterMeterModule,
    ChangeResidentModule,
    DwellingUtilsModule,
    ComponentsModule,
    TableModule,
    NewWaterFormModule,
  ],
  exports: [DwellingComponent],
})
export class DwellingModule {}
