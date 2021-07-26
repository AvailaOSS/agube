import { Pipe, PipeTransform } from '@angular/core';
import { Paymaster } from '@availa/agube-rest-api';
import { isUndefined } from 'lodash';

@Pipe({
  name: 'paymaster'
})
export class PaymasterPipe implements PipeTransform {

  transform(paymaster: Paymaster): unknown {
    if (!isUndefined(paymaster)) {
      return paymaster.iban;
    }
  }
}
