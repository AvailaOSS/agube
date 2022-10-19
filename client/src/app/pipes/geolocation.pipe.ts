import { SlicePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Geolocation } from '@availaoss/agube-rest-api';
import { AddressPipe } from './address.pipe';

@Pipe({
    name: 'geolocation',
})
export class GeolocationPipe implements PipeTransform {
    slice: SlicePipe;
    address: AddressPipe;

    constructor(slice: SlicePipe, address: AddressPipe) {
        this.slice = slice;
        this.address = address;
    }

    transform(geolocation: Geolocation, mode?: string): string {
        if (mode && mode == 'geolocation') {
            return (
                this.slice.transform(geolocation.latitude, 0, 7) +
                ', ' +
                this.slice.transform(geolocation.longitude, 0, 7)
            );
        }

        let number = '';

        if (geolocation.number) {
            number = ', ' + String(geolocation.number);
        }

        if (mode && mode == 'short') {
            return (
                geolocation.address.road +
                this.address.fillEmpty(geolocation.number) +
                this.address.fillEmpty(geolocation.flat) +
                this.address.fillEmpty(geolocation.gate)
            );
        }

        let append =
            this.address.fillEmpty(geolocation.number) +
            this.address.fillEmpty(geolocation.flat) +
            this.address.fillEmpty(geolocation.gate);

        return this.address.transform(geolocation.address, append);
    }
}
