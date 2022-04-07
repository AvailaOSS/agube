import { Pipe, PipeTransform } from '@angular/core';
import { ReservoirDetail } from '@availa/agube-rest-api';

@Pipe({
  name: 'reservoirDetail',
})
export class ReservoirDetailPipe implements PipeTransform {
  transform(reservoirDetail: ReservoirDetail): string {
    return (
      reservoirDetail.street +
      ', ' +
      reservoirDetail.town +
      ', ' +
      reservoirDetail.number +
      ', ' +
      reservoirDetail.flat +
      ' ' +
      reservoirDetail.gate
    );
  }
}
