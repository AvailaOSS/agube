import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// MDB Angular Free
import { CreateDwellingModule } from './create-dwelling/create-dwelling.module';
import { DwellingDetailCardComponent } from './dwelling-detail-card/dwelling-detail-card.component';
import { DwellingResidentDetailCard } from './dwelling-detail-card/management-detail-card/dwelling-management.component';
import { ChangeOwnerModule } from './dwelling-detail-card/management-detail-card/management-components/change-owner/change-owner.module';
import { ChangePaymasterModule } from './dwelling-detail-card/management-detail-card/management-components/change-paymaster/change-paymaster.module';
import { ChangeResidentModule } from './dwelling-detail-card/management-detail-card/management-components/change-resident/change-resident.module';
import { ChangeWaterMeterModule } from './dwelling-detail-card/management-detail-card/management-components/change-water-meter/change-water-meter.module';
import { DwellingUtilsModule } from './dwelling-detail-card/management-detail-card/management-components/dwelling-utils/dwelling-utils.module';
import { WaterMeterEnabledDetailCardComponent } from './dwelling-detail-card/water-meter-enabled-detail-card/water-meter-enabled-detail-card.component';
import { DWellingWaterMeterReadingsComponent } from './dwelling-detail-card/water-meter-readings-detail-card/dwelling-water-meter-readings-detail-card.component';
import { DwellingDetailListComponent } from './dwelling-detail-list/dwelling-detail-list.component';
import { DwellingComponent } from './dwelling.component';
import { ComponentsModule } from '../../components/components.module';
import { TableModule } from '@availa/table';
import { NewWaterFormComponent } from './dwelling-detail-card/water-meter-readings-detail-card/new-water-meter-form/new-water-form/new-water-form.component';

@NgModule({
  declarations: [
    DwellingComponent,
    DwellingDetailListComponent,
    DwellingDetailCardComponent,
    DwellingResidentDetailCard,
    DWellingWaterMeterReadingsComponent,
    WaterMeterEnabledDetailCardComponent,
    NewWaterFormComponent
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
    TableModule
  ],
  exports: [DwellingComponent],
})
export class DwellingModule {}
