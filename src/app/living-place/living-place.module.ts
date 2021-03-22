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
import { WaterMeterDetailCardComponent } from './living-place-detail-card/living-place-management/water-meter-detail-card/water-meter-detail-card.component';
import { ToolbarModule } from '../menu/toolbar.module';
import { AddWellingModule } from './living-place-detail-card/management-components/add-welling/add-welling.module';
import { UtilsModule } from './living-place-detail-card/management-components/add-welling/utils/utils.module';
import { ChangePayModule } from './living-place-detail-card/management-components/change-pay/change-pay.module';
import { ChangeCountModule } from './living-place-detail-card/management-components/change-count/change-count.module';

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
    AddWellingModule,
    ChangePayModule,
    ChangeCountModule,
    ToolbarModule,
    UtilsModule
  ],
  exports: [LivingPlaceComponent],
})
export class LivingPlaceModule {}
