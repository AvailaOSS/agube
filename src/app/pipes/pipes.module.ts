import { UserDetailPipe } from './user-detail.pipe';
import { NgModule } from '@angular/core';
import { DwellingDetailPipe } from './dwelling-detail.pipe';
import { AddressPipe } from './address.pipe';
import { WaterMeterMeasurementPipe } from './water-meter-measurement.pipe';
import { ReservoirDetailPipe } from './reservoir-detail.pipe';
import { CommonModule, SlicePipe } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DwellingDetailPipe,
    AddressPipe,
    ReservoirDetailPipe,
    UserDetailPipe,
    WaterMeterMeasurementPipe,
  ],
  providers: [SlicePipe],
  exports: [
    DwellingDetailPipe,
    AddressPipe,
    ReservoirDetailPipe,
    UserDetailPipe,
    WaterMeterMeasurementPipe,
  ],
})
export class PipesModule {}
