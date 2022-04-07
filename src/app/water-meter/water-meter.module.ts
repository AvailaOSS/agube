import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterMeterRoutingModule } from './water-meter-routing.module';
import { WaterMeterComponent } from './water-meter/water-meter.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WaterMeterContentComponent } from './water-meter-content/water-meter-content.component';
import { MeasureDialogComponent } from './water-meter/measure-dialog/measure-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { WaterMeterChangeDialogComponent } from './water-meter-change-dialog/water-meter-change-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    WaterMeterComponent,
    WaterMeterContentComponent,
    MeasureDialogComponent,
    WaterMeterChangeDialogComponent,
  ],
  imports: [
    CommonModule,
    WaterMeterRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule,
    TranslateModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  exports: [WaterMeterComponent, WaterMeterContentComponent],
})
export class WaterMeterModule {}
