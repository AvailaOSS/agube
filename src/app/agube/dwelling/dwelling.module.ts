import { NgModule } from '@angular/core';
import { CreateDwellingModule } from './create-dwelling/create-dwelling.module';
import { ChangePersonModule } from './dwelling-detail-card/management-card/management-components/change-person/change-person.module';
import { DwellingComponent } from './dwelling.component';
import { DwellingRoutingModule } from './dwelling-routing.module';
import { TableModule } from '@availa/table';
import { DwellingDetailListComponent } from './dwelling-detail-list/dwelling-detail-list.component';
import { DwellingDetailCardComponent } from './dwelling-detail-card/dwelling-detail-card.component';
import { CommonModule } from '@angular/common';
import { DwellingManagementCard } from './dwelling-detail-card/management-card/dwelling-management-card.component';
import { WaterMeterModule } from '../water-meter/water-meter.module';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    DwellingComponent,
    DwellingDetailListComponent,
    DwellingDetailCardComponent,
    DwellingManagementCard
  ],
  imports: [
    CommonModule,
    CreateDwellingModule,
    ChangePersonModule,
    ComponentsModule,
    TableModule,
    WaterMeterModule,
    DwellingRoutingModule,
  ],
})
export class DwellingModule {}
