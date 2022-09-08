import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Component, HostListener, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WaterMeterService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { noFutureDate } from './no-future-date';
import { MeasureDialogData } from './measure-dialog-data';
import { set, format } from 'date-fns';
import { MeasureDialog } from './measure-dialog';

@Component({
    selector: 'app-measure-dialog',
    templateUrl: './measure-dialog.component.html',
    styleUrls: ['./measure-dialog.component.scss'],
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
                    this.disabled = true;
                    this.loadingPost = false;
                    this.svcNotification.warning({
                        message:
                            // FIXME: it should be translated
                            'La Hora ' +
                            format(date, 'dd-MM-yyyy HH:mm') +
                            ' es posterior a la actual, eso no es posible',
                    }),
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
