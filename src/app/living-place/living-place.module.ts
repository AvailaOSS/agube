import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LivingPlaceComponent } from './living-place.component';
import { MatTableModule } from '@angular/material/table';
import { ControlPanelModule } from '../control-panel/control-panel.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LivingPlaceDetailListComponent } from './living-place-detail-list/living-place-detail-list.component';
import { LivingPlaceDetailCardComponent } from './living-place-detail-card/living-place-detail-card.component';
import { LivingPlaceManagementComponent } from './living-place-detail-card/living-place-management/living-place-management.component';
import { LivingPlaceWaterMeterReadingsComponent } from './living-place-detail-card/living-place-water-meter-readings/living-place-water-meter-readings.component';
import { WaterMeterDetailCardComponent } from './living-place-detail-card/water-meter-detail-card/water-meter-detail-card.component';

@NgModule({
  declarations: [
    LivingPlaceComponent,
    LivingPlaceDetailListComponent,
    LivingPlaceDetailCardComponent,
    LivingPlaceManagementComponent,
    LivingPlaceWaterMeterReadingsComponent,
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
  ],
  exports: [LivingPlaceComponent],
})
export class LivingPlaceModule {}
