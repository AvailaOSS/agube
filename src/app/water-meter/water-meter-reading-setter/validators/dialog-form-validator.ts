import { AbstractControl } from '@angular/forms';
import { isUndefined } from 'lodash';
import { isAfter, add, parseISO } from 'date-fns';

export function DateValidator(control: AbstractControl): any {
  if (!isUndefined(control.value.date) && !isUndefined(control.value.time)) {
    const dateModel = parseISO(control.value.date);

    if (isAfter(dateModel, new Date())) {
      return {
        dialogForm: { message: 'No se puede crear lecturas en el futuro' },
      };
    }
  }
}

export function TimeValidator(control: AbstractControl): any {
  if (!isUndefined(control.value.date) && !isUndefined(control.value.time)) {
    const dateModel = add(parseISO(control.value.date), {
      hours: control.value.time.split(':')[0],
      minutes: control.value.time.split(':')[1],
    });

    if (isAfter(dateModel, new Date())) {
      return {
        dialogForm: { message: 'No se puede crear lecturas en el futuro' },
      };
    }
  }
}
