import { Pipe, PipeTransform } from '@angular/core';
import { DwellingDetail } from '@availa/agube-rest-api';

@Pipe({
  name: 'dwellingDetail',
})
export class DwellingDetailPipe implements PipeTransform {
  transform(dwellingDetail: DwellingDetail): string {
    return (
      dwellingDetail.street +
      ', ' +
      dwellingDetail.town +
      ', ' +
      dwellingDetail.number +
      ', ' +
      dwellingDetail.flat +
      ' ' +
      dwellingDetail.gate
    );
  }
}
