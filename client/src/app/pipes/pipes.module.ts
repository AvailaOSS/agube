import { CommonModule, SlicePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddressPipe } from './address.pipe';
import { DwellingDetailPipe } from './dwelling-detail.pipe';
import { GeolocationPipe } from './geolocation.pipe';
import { ReservoirDetailPipe } from './reservoir-detail.pipe';
import { SpringSourceDetailPipe } from './spring-source-detail.pipe';
import { UserDetailPipe } from './user-detail.pipe';
import { WaterMeterMeasurementPipe } from './water-meter-measurement.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [
        DwellingDetailPipe,
        GeolocationPipe,
        ReservoirDetailPipe,
        UserDetailPipe,
        SpringSourceDetailPipe,
        WaterMeterMeasurementPipe,
        AddressPipe,
    ],
    providers: [SlicePipe, AddressPipe, GeolocationPipe],
    exports: [
        DwellingDetailPipe,
        AddressPipe,
        GeolocationPipe,
        ReservoirDetailPipe,
        SpringSourceDetailPipe,
        UserDetailPipe,
        WaterMeterMeasurementPipe,
    ],
})
export class PipesModule {}
