import { Pipe, PipeTransform } from '@angular/core';
import { FullAddress } from '@availa/agube-rest-api';

@Pipe({
  name: 'fullAddress'
})
export class FullAddressPipe implements PipeTransform {

  transform(fullAddress: FullAddress): string {
    return fullAddress.address.street + ' ' + fullAddress.number + ', ' + fullAddress.flat + ' ' + fullAddress.gate
  }
}
