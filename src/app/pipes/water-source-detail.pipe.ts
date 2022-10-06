import { Pipe, PipeTransform } from '@angular/core';
import { SpringSourceDetail } from '@availa/agube-rest-api';

@Pipe({
    name: 'WaterSourceDetail',
})
export class WaterSourceDetailPipe implements PipeTransform {
    transform(waterSourceDetail: SpringSourceDetail): string {
        let number = '';

        if (waterSourceDetail.number) {
            number = ', ' + waterSourceDetail.number;
        }

        return waterSourceDetail.road + number + ', ' + waterSourceDetail.city;
    }
}
