import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '@availa/agube-rest-api';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  transform(address: Address, mode?: string): string {
    if (mode && mode == 'geolocation') {
      return (
        address.geolocation.latitude + ', ' + address.geolocation.longitude
      );
    }

    let number = '';

    if (address.number) {
      number = ', ' + String(address.number);
    }

    if (mode && mode == 'short') {
      return (
        address.road +
        this.fillEmpty(address.number) +
        this.fillEmpty(address.flat) +
        this.fillEmpty(address.gate)
      );
    }
    return (
      address.road +
      this.fillEmpty(address.number) +
      this.fillEmpty(address.flat) +
      this.fillEmpty(address.gate) +
      ', ' +
      address.city +
      this.fillEmpty(address.city_district) +
      this.fillEmpty(address.village) +
      this.fillEmpty(address.province) +
      this.fillEmpty(address.municipality) +
      this.fillEmpty(address.postcode)
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
