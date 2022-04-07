import { UserDetailPipe } from './user-detail.pipe';
import { NgModule } from '@angular/core';
import { DwellingDetailPipe } from './dwelling-detail.pipe';
import { FullAddressPipe } from './full-address.pipe';
import { WaterMeterMeasurementPipe } from './water-meter-measurement.pipe';
import { ReservoirDetailPipe } from './reservoir-detail.pipe';

@NgModule({
  imports: [],
  declarations: [
    DwellingDetailPipe,
    FullAddressPipe,
    ReservoirDetailPipe,
    UserDetailPipe,
    WaterMeterMeasurementPipe,
  ],
  exports: [
    DwellingDetailPipe,
    FullAddressPipe,
    ReservoirDetailPipe,
    UserDetailPipe,
    WaterMeterMeasurementPipe,
  ],
})
export class PipesModule {}
