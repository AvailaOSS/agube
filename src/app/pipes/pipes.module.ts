import { UserDetailPipe } from './user-detail.pipe';
import { NgModule } from '@angular/core';
import { DwellingDetailPipe } from './dwelling-detail.pipe';
import { AddressPipe } from './address.pipe';
import { WaterMeterMeasurementPipe } from './water-meter-measurement.pipe';
import { ReservoirDetailPipe } from './reservoir-detail.pipe';

@NgModule({
  imports: [],
  declarations: [
    DwellingDetailPipe,
    AddressPipe,
    ReservoirDetailPipe,
    UserDetailPipe,
    WaterMeterMeasurementPipe,
  ],
  exports: [
    DwellingDetailPipe,
    AddressPipe,
    ReservoirDetailPipe,
    UserDetailPipe,
    WaterMeterMeasurementPipe,
  ],
})
export class PipesModule {}
