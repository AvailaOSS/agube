import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterMeterRoutingModule } from './water-meter-routing.module';
import { DetailComponent } from './detail/detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
import { GaugeMeasurementComponent } from './gauge-measurement/gauge-measurement.component';
import { MeasureEditDialogComponent } from './detail/measure-edit-dialog/measure-edit-dialog.component';

@NgModule({
    declarations: [
        DetailComponent,
        MeasureDialogComponent,
        WaterMeterDialogComponent,
        GaugeMeasurementComponent,
        MeasureEditDialogComponent,
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
        MatPaginatorModule,
        MatProgressBarModule,
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
    exports: [DetailComponent, GaugeMeasurementComponent],
})
export class WaterMeterModule {}
