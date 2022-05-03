import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterMeterRoutingModule } from './water-meter-routing.module';
import { DetailComponent } from './detail/detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContentComponent } from './content/content.component';
import { MeasureDialogComponent } from './detail/measure-dialog/measure-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { WaterMeterDialogComponent } from './dialog/dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { GaugeModule } from './gauge/gauge.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    DetailComponent,
    ContentComponent,
    MeasureDialogComponent,
    WaterMeterDialogComponent,
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
    GaugeModule,
    MatPaginatorModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  exports: [DetailComponent, ContentComponent],
})
export class WaterMeterModule {}
