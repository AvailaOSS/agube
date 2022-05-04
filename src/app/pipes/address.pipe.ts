import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '@availa/agube-rest-api';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  transform(address: Address, append?: String): string {
    if (append) {
      return (
        this.fillEmpty(address.road, true) +
        append +
        ', ' +
        address.city +
        this.fillEmpty(address.city_district) +
        this.fillEmpty(address.village) +
        this.fillEmpty(address.province) +
        this.fillEmpty(address.municipality) +
        this.fillEmpty(address.postcode)
      );
    }
    return (
      address.road +
      ', ' +
      address.city +
      this.fillEmpty(address.city_district) +
      this.fillEmpty(address.village) +
      this.fillEmpty(address.province) +
      this.fillEmpty(address.municipality) +
      this.fillEmpty(address.postcode)
    );
  }

  public fillEmpty(value: string | number | undefined, noSetComma?: boolean) {
    let result = '';

    if (value) {
      if (!noSetComma) {
        result = ', ';
      }
      result += String(value);
    }

    return result;
  }
}
