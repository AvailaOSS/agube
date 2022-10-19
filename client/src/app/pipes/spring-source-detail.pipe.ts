import { Pipe, PipeTransform } from '@angular/core';
import { SpringSourceDetail } from '@availaoss/agube-rest-api';

@Pipe({
    name: 'SpringSourceDetail',
})
export class SpringSourceDetailPipe implements PipeTransform {
    transform(springSourceDetail: SpringSourceDetail): string {
        let number = '';

        if (springSourceDetail.number) {
            number = ', ' + springSourceDetail.number;
        }

        return springSourceDetail.road + number + ', ' + springSourceDetail.city;
    }
}
