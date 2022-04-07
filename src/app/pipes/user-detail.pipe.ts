import { Pipe, PipeTransform } from '@angular/core';
import { UserDetail } from '@availa/agube-rest-api';

@Pipe({
  name: 'userDetail',
})
export class UserDetailPipe implements PipeTransform {
  transform(userDetail: UserDetail): string {
    return userDetail.last_name + ', ' + userDetail.first_name;
  }
}
