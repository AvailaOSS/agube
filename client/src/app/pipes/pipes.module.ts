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
    declarations: [
        AddressPipe,
        DwellingDetailPipe,
        GeolocationPipe,
        ReservoirDetailPipe,
        SpringSourceDetailPipe,
        UserDetailPipe,
        WaterMeterMeasurementPipe,
    ],
    exports: [
        AddressPipe,
        DwellingDetailPipe,
        GeolocationPipe,
        ReservoirDetailPipe,
        SpringSourceDetailPipe,
        UserDetailPipe,
        WaterMeterMeasurementPipe,
    ],
    imports: [CommonModule],
    providers: [SlicePipe, AddressPipe, GeolocationPipe],
})
export class PipesModule {}
