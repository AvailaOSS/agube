import { AbstractControl } from '@angular/forms';
import { isFuture } from 'date-fns';

export function noFutureDate(date: AbstractControl) {
    if (isFuture(date.value)) {
        return { dateInFuture: true };
    }
    return null;
}
