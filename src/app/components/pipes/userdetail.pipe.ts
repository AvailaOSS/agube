import { Pipe, PipeTransform } from '@angular/core';
import { UserDetail } from '@availa/agube-rest-api';
import { isUndefined } from 'lodash';

@Pipe({
  name: 'userDetailName',
})
export class UserDetailPipe implements PipeTransform {
  transform(user: UserDetail): string {
    if (!isUndefined(user)) {
      return user.last_name + ', ' + user.first_name;
    }
  }
}
