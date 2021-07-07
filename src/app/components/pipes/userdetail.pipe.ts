import { Pipe, PipeTransform } from '@angular/core';
import { UserDetail } from '@availa/agube-rest-api';

@Pipe({
  name: 'userDetailName'
})
export class UserDetailPipe implements PipeTransform {

  transform(user: UserDetail): string {
    return user.last_name + ', ' + user.first_name
  }

}
