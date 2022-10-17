import { Pipe, PipeTransform } from '@angular/core';
import { UserCreate, UserDetail } from '@availa/agube-rest-api';

@Pipe({
    name: 'userDetail',
})
export class UserDetailPipe implements PipeTransform {
    transform(userDetail: UserDetail | UserCreate): string {
        return userDetail.last_name + ', ' + userDetail.first_name;
    }
}
