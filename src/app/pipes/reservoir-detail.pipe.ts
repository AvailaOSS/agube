import { Pipe, PipeTransform } from '@angular/core';
import { ReservoirDetail } from '@availa/agube-rest-api';

@Pipe({
  name: 'reservoirDetail',
})
export class ReservoirDetailPipe implements PipeTransform {
  transform(reservoirDetail: ReservoirDetail): string {
    let number = '';

    if (reservoirDetail.number) {
      number = ', ' + reservoirDetail.number;
    }

    return reservoirDetail.road + number + ', ' + reservoirDetail.city;
  }
}
