import { Pipe, PipeTransform } from '@angular/core';
import { DwellingDetail } from '@availa/agube-rest-api';

@Pipe({
  name: 'dwellingAddress'
})
export class DwellingAddressPipe implements PipeTransform {

  transform(dwelling: DwellingDetail): string {
    return dwelling.street + ' ' + dwelling.number + ', ' + dwelling.flat + ' ' + dwelling.gate + ', ' + dwelling.town
  }
}
