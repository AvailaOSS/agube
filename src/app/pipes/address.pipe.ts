import { SlicePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Geolocation } from '@availa/agube-rest-api';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  slice: SlicePipe;
  constructor(slice: SlicePipe) {
    this.slice = slice;
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
        this.fillEmpty(geolocation.number) +
        this.fillEmpty(geolocation.flat) +
        this.fillEmpty(geolocation.gate)
      );
    }
    return (
      geolocation.address.road +
      this.fillEmpty(geolocation.number) +
      this.fillEmpty(geolocation.flat) +
      this.fillEmpty(geolocation.gate) +
      ', ' +
      geolocation.address.city +
      this.fillEmpty(geolocation.address.city_district) +
      this.fillEmpty(geolocation.address.village) +
      this.fillEmpty(geolocation.address.province) +
      this.fillEmpty(geolocation.address.municipality) +
      this.fillEmpty(geolocation.address.postcode)
    );
  }

  private fillEmpty(value: string | number | undefined) {
    let result = '';

    if (value) {
      result = ', ' + String(value);
    }

    return result;
  }
}
