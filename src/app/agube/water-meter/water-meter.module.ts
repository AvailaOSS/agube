import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { NotificationModule } from '@availa/notification';
import { TableModule } from '@availa/table';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ChangeWaterMeterComponent } from './change-water-meter/change-water-meter.component';
import { WaterMeterReadingsComponent } from './water-meter-reading-detail/water-meter-reading-detail-card.component';
import {
  DateValidator,
  TimeValidator,
} from './water-meter-reading-setter/validators/dialog-form-validator';
import { WaterMeterReadingSetterComponent } from './water-meter-reading-setter/water-meter-reading-setter.component';

@NgModule({
  declarations: [
    WaterMeterReadingsComponent,
    WaterMeterReadingSetterComponent,
    ChangeWaterMeterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    NotificationModule,
    // ComponentsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validators: [
        { name: 'date-validation', validation: DateValidator },
        { name: 'time-validation', validation: TimeValidator },
      ],
      validationMessages: [
        { name: 'required', message: 'Este campo es obligatorio' },
      ],
    }),
  ],
  exports: [
    WaterMeterReadingsComponent,
    WaterMeterReadingSetterComponent,
    ChangeWaterMeterComponent,
  ],
})
export class WaterMeterModule {}
