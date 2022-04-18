import { Pipe, PipeTransform } from '@angular/core';
import { FullAddress } from '@availa/agube-rest-api';

@Pipe({
  name: 'fullAddress',
})
export class FullAddressPipe implements PipeTransform {
  transform(fullAddress: FullAddress, mode?: string): string {
    const address = fullAddress.address;
    if (mode && mode == 'geolocation') {
      return address.town + ', ' + address.street;
    }
    if (mode && mode == 'short') {
      return (
        address.street +
        ', ' +
        fullAddress.number +
        ', ' +
        fullAddress.flat +
        ' ' +
        fullAddress.gate
      );
    }
    return (
      address.street +
      ', ' +
      address.town +
      ', ' +
      fullAddress.number +
      ', ' +
      fullAddress.flat +
      ' ' +
      fullAddress.gate
    );
  }
}
