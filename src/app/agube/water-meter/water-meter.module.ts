import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NotificationModule } from '@availa/notification';
import { TableModule } from '@availa/table';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { isUndefined } from 'lodash';
import { ComponentsModule } from 'src/app/components/components.module';
import { ChangeWaterMeterComponent } from './change-water-meter/change-water-meter.component';
import { WaterMeterReadingsComponent } from './water-meter-reading-detail/water-meter-reading-detail-card.component';
import { WaterMeterReadingSetterComponent } from './water-meter-reading-setter/water-meter-reading-setter.component';

export function fieldMatchValidator(control: AbstractControl): any {
  if (!isUndefined(control.value.date) && !isUndefined(control.value.time)) {
    const dateModel = new Date(
      control.value.date.split('-')[0],
      control.value.date.split('-')[1] - 1,
      control.value.date.split('-')[2],
      control.value.time.split(':')[0],
      control.value.time.split(':')[1]
    );

    if (dateModel > new Date()) {
      return { fieldMatch: { message: 'No se puede agregar datos a futuro' } };
    }
  } else {
    return null;
  }
}

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
    ComponentsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validators: [{ name: 'fieldMatch', validation: fieldMatchValidator }],
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
