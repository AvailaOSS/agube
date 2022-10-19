import { Pipe, PipeTransform } from '@angular/core';
import { DwellingDetail, UserDwellingDetail } from '@availaoss/agube-rest-api';

@Pipe({
    name: 'dwellingDetail',
})
export class DwellingDetailPipe implements PipeTransform {
    transform(dwellingDetail: DwellingDetail | UserDwellingDetail): string {
        return dwellingDetail.road + ', ' + dwellingDetail.number + ', ' + dwellingDetail.city;
    }
}
