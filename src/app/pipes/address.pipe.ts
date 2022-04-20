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
    if (mode && mode == 'short') {
      return (
        address.road +
        ', ' +
        address.number +
        ', ' +
        address.flat +
        ' ' +
        address.gate
      );
    }
    return (
      address.road +
      ', ' +
      address.number +
      ', ' +
      address.flat +
      ' ' +
      address.gate +
      ',' +
      address.city
    );
  }
}
