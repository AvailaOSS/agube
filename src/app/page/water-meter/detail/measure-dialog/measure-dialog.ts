import { FormControl, Validators } from '@angular/forms';
import { noFutureDate } from './no-future-date';

export class MeasureDialog {
    public disabled: boolean = true;
    public loadingPost: boolean = false;
    public measurement = new FormControl('', [Validators.required]);
    public date = new FormControl(new Date(), [Validators.required, noFutureDate]);
    public hour = new FormControl('', [Validators.required]);
    public minutes = new FormControl('', [Validators.required]);

    // range for mat-select
    public hoursList = this.range(24);
    public minutesList = this.range(60);

    public save(): void {}

    public close(reload: boolean): void {}

    public saveAndClose() {
        this.save();
        this.close(true);
    }

    public errorValidator(entity: string) {
        switch (entity) {
            case 'measurement':
                if (this.measurement.hasError('required')) {
                    return 'PAGE.WATER_METER.DIALOG.MEASURE.FORM.MEASURE.VALIDATION.REQUIRED';
                }
                return '';
            case 'date':
                if (this.date.hasError('required')) {
                    return 'PAGE.WATER_METER.DIALOG.MEASURE.FORM.DATE.VALIDATION.REQUIRED';
                }
                if (this.date.hasError('dateInFuture')) {
                    return 'PAGE.WATER_METER.DIALOG.MEASURE.FORM.DATE.VALIDATION.DATE_IN_FUTURE';
                }
                return '';
            case 'minutes':
            case 'hour':
                if (this.hour.hasError('required') || this.minutes.hasError('required')) {
                    return 'PAGE.WATER_METER.DIALOG.MEASURE.FORM.MINUTES.VALIDATION.REQUIRED';
                }
                return '';
            default:
                return '';
        }
    }

    protected range(end: number) {
        return Array.from(Array(end).keys()).reverse();
    }
}
