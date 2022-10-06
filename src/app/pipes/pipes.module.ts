import { WaterSourceDetailPipe } from './water-source-detail.pipe';
import { UserDetailPipe } from './user-detail.pipe';
import { NgModule } from '@angular/core';
import { DwellingDetailPipe } from './dwelling-detail.pipe';
import { GeolocationPipe } from './geolocation.pipe';
import { WaterMeterMeasurementPipe } from './water-meter-measurement.pipe';
import { ReservoirDetailPipe } from './reservoir-detail.pipe';
import { CommonModule, SlicePipe } from '@angular/common';
import { AddressPipe } from './address.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [
        DwellingDetailPipe,
        GeolocationPipe,
        ReservoirDetailPipe,
        UserDetailPipe,
        WaterSourceDetailPipe,
        WaterMeterMeasurementPipe,
        AddressPipe,
    ],
    providers: [SlicePipe, AddressPipe, GeolocationPipe],
    exports: [
        DwellingDetailPipe,
        AddressPipe,
        GeolocationPipe,
        ReservoirDetailPipe,
        WaterSourceDetailPipe,
        UserDetailPipe,
        WaterMeterMeasurementPipe,
    ],
})
export class PipesModule {}
