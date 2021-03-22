import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DWellingComponent } from './dwelling.component';
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
import { ToolbarModule } from '../menu/toolbar.module';
<<<<<<< HEAD:src/app/living-place/living-place.module.ts
import { AddWellingModule } from './living-place-detail-card/management-components/add-welling/add-welling.module';
import { UtilsModule } from './living-place-detail-card/management-components/add-welling/utils/utils.module';
import { ChangePayModule } from './living-place-detail-card/management-components/change-pay/change-pay.module';
import { ChangeCountModule } from './living-place-detail-card/management-components/change-count/change-count.module';
=======
import { AdDWellingModule } from './dwelling-detail-card/management-components/add-welling/add-welling.module';
import { UtilsModule } from './dwelling-detail-card/management-components/utils/utils.module';
import { ChangePayModule } from './dwelling-detail-card/management-components/change-pay/change-pay.module';
import { ChangeCountModule } from './dwelling-detail-card/management-components/change-count/change-count.module';
>>>>>>> 969aab6... fix: update new name dwelling:src/app/dwelling/dwelling.module.ts

@NgModule({
  declarations: [
    DWellingComponent,
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
    AdDWellingModule,
    ChangePayModule,
    ChangeCountModule,
    ToolbarModule,
    UtilsModule
  ],
  exports: [DWellingComponent],
})
export class DWellingModule {}
