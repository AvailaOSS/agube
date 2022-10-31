import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Component, HostListener, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WaterMeterService } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { noFutureDate } from './no-future-date';
import { MeasureDialogData } from './measure-dialog-data';
import { set, isFuture } from 'date-fns';
import { MeasureDialog } from './measure-dialog';

@Component({
    selector: 'app-measure-dialog',
    styleUrls: ['./measure-dialog.component.scss'],
    templateUrl: './measure-dialog.component.html',
})
export class MeasureDialogComponent extends MeasureDialog {
    public waterMeterId: number = -1;
    public measureForm: FormGroup;
    public override measurement = new FormControl('', [Validators.required]);
    public override date = new FormControl(new Date(), [Validators.required, noFutureDate]);
    public override hour = new FormControl('', [Validators.required]);
    public override minutes = new FormControl('', [Validators.required]);

    constructor(
        private formBuilder: FormBuilder,
        private readonly svcWaterMeter: WaterMeterService,
        public dialogRef: MatDialogRef<MeasureDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: MeasureDialogData,
        private svcNotification: NotificationService,
        private googleAnalyticsService: GoogleAnalyticsService
    ) {
        super();
        this.measureForm = this.formBuilder.group({
            measurement: this.measurement,
            date: this.date,
            hour: this.hour,
            minutes: this.minutes,
        });
        this.waterMeterId = data.waterMeterId;
        if (data.lastMeasurement) {
            this.measurement.setValue(data.lastMeasurement.measurement);
        }
    }

    public override checkTime() {
        let date = set(this.date.value, {
            hours: this.hour.value,
            minutes: this.minutes.value,
        });

        if (isFuture(date)) {
            this.hour.setErrors({ dateInFuture: true });
            this.minutes.setErrors({ dateInFuture: true });
        } else {
            this.hour.setErrors(null);
            this.minutes.setErrors(null);
        }
    }

    public override setTime(time: number, type: string) {
        let date: Date;
        switch (type) {
            case 'hour':
                this.hour.setErrors(null);
                date = set(this.date.value, {
                    hours: time,
                    minutes: this.minutes.value,
                });
                break;
            case 'min':
                this.minutes.setErrors(null);
                date = set(this.date.value, {
                    hours: this.hour.value,
                    minutes: time + 1,
                });
                break;
            default:
                console.debug('set time "hour" or "min" instead of ', time);
                return;
        }

        if (isFuture(date)) {
            this.hour.setErrors({ dateInFuture: true });
            this.minutes.setErrors({ dateInFuture: true });
        } else {
            this.hour.setErrors(null);
            this.minutes.setErrors(null);
        }
    }

    public override save(): void {
        // stop here if form is invalid
        if (this.measureForm.invalid) {
            return;
        }
        this.disabled = true;
        this.loadingPost = true;

        let date = set(this.date.value, {
            hours: this.hour.value,
            minutes: this.minutes.value,
        });

        this.svcWaterMeter
            .addWaterMeterMeasurement(this.waterMeterId, {
                measurement: this.measurement.value,
                date: date,
            })
            .subscribe({
                next: (response) => this.close(true),
                error: (error) => {
                    this.disabled = false;
                    this.loadingPost = false;
                    this.svcNotification.warning({ message: error.error.status }),
                        this.googleAnalyticsService.exception('error_water_meter_measure', true);
                },
            });
    }

    public override close(reload: boolean): void {
        this.disabled = false;
        this.loadingPost = false;
        this.dialogRef.close(reload);
    }

    @HostListener('window:keyup.esc') public onKeyUp() {
        this.close(false);
    }
}
