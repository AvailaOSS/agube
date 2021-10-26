import { Pipe, PipeTransform } from '@angular/core';
import { FullAddress } from '@availa/agube-rest-api';

@Pipe({
  name: 'fullAddress',
})
export class FullAddressPipe implements PipeTransform {
  transform(fullAddress: FullAddress): string {
    const flat = fullAddress.flat === null ? '' : fullAddress.flat;
    const gate = fullAddress.gate === null ? '' : fullAddress.gate;
    return (
      fullAddress.address.street +
      ' ' +
      fullAddress.number +
      ', ' +
      flat +
      ' ' +
      gate
    );
  }
}
