import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LivingPlaceComponent } from './living-place.component';
import { MatTableModule } from '@angular/material/table';
import { ControlPanelModule } from '../control-panel/control-panel.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LivingPlaceDetailListComponent } from './living-place-detail-list/living-place-detail-list.component';
import { LivingPlaceDetailCardComponent } from './living-place-detail-card/living-place-detail-card.component';
import { LivingPlaceManagementComponent } from './living-place-detail-card/living-place-management/living-place-management.component';

@NgModule({
  declarations: [
    LivingPlaceComponent,
    LivingPlaceDetailListComponent,
    LivingPlaceDetailCardComponent,
    LivingPlaceManagementComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatTableModule,
    MatButtonModule,
    ControlPanelModule,
    MatCardModule,
  ],
  exports: [LivingPlaceComponent],
})
export class LivingPlaceModule {}
