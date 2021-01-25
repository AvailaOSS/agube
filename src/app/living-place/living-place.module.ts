import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LivingPlaceComponent } from './living-place.component';
import { MatTableModule } from '@angular/material/table';
import { ControlPanelModule } from '../control-panel/control-panel.module';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LivingPlaceDetailListComponent } from './living-place-detail-list/living-place-detail-list.component';
import { LivingPlaceDetailCardComponent } from './living-place-detail-card/living-place-detail-card.component';

@NgModule({
  declarations: [LivingPlaceComponent, LivingPlaceDetailListComponent, LivingPlaceDetailCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatTableModule,
    ControlPanelModule,
    MatCardModule,
  ],
  exports: [LivingPlaceComponent],
})
export class LivingPlaceModule {}
