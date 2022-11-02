import { FormControl } from '@angular/forms';
import { format } from 'date-fns';

export interface DateFilter {
    dateEnd: Date;
    dateStart: Date;
}

export function formatDate(date: any): string {
    return (date = String(format(date, 'yyyy-MM-dd')));
}

export function dateValidator(dateStart: FormControl, dateEnd: FormControl): DateFilter {
    const start = new Date('2022-01-01');

    let validated: DateFilter = {
        dateEnd: new Date(),
        dateStart: start,
    };

    if (dateStart !== null && dateStart.value !== null) {
        validated.dateStart = dateStart.value;
    }

    if (dateEnd !== null && dateEnd.value !== null) {
        validated.dateEnd = dateEnd.value;
    }

    return validated;
}
