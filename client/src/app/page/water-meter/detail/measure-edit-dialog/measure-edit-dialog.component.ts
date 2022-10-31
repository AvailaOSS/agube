import { Component, HostListener, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeasurementService, WaterMeterMeasurement } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { getHours, getMinutes } from 'date-fns';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { MeasureDialog } from '../measure-dialog/measure-dialog';
import { MeasureDialogComponent } from '../measure-dialog/measure-dialog.component';
import { noFutureDate } from '../measure-dialog/no-future-date';
import { MeasureEditDialogData } from './measure-edit-dialog-data';

@Component({
    selector: 'app-measure-edit-dialog',
    styleUrls: ['../measure-dialog/measure-dialog.component.scss'],
    templateUrl: '../measure-dialog/measure-dialog.component.html',
})
export class MeasureEditDialogComponent extends MeasureDialog {
    override disabled = false;
    public currentMeasurement: WaterMeterMeasurement | undefined;
    public measureForm: FormGroup;
    public override measurement = new FormControl('', [Validators.required]);
    public override date = new FormControl({ value: new Date(), disabled: true }, [Validators.required, noFutureDate]);
    public override hour = new FormControl({ value: '', disabled: true }, [Validators.required]);
    public override minutes = new FormControl({ value: '', disabled: true }, [Validators.required]);

    constructor(
        private formBuilder: FormBuilder,
        private readonly svcMeasurement: MeasurementService,
        public dialogRef: MatDialogRef<MeasureDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: MeasureEditDialogData,
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
        this.currentMeasurement = data.currentMeasurement;
        this.measurement.setValue(data.currentMeasurement.measurement);
        this.date.setValue(data.currentMeasurement.date);
        this.hour.setValue(String(getHours(new Date(data.currentMeasurement.date!))));
        this.minutes.setValue(String(getMinutes(new Date(data.currentMeasurement.date!))));
    }

    public override save(): void {
        // stop here if form is invalid
        if (this.measureForm.invalid || !this.currentMeasurement) {
            return;
        }
        this.disabled = true;
        this.loadingPost = true;

        let newMeasure = {
            id: this.currentMeasurement?.id!,
            measurement: this.measurement.value,
        };

        this.svcMeasurement.updateMeasurement(this.currentMeasurement?.id!, newMeasure).subscribe({
            next: (response) => {
                this.close(true);
                this.googleAnalyticsService.gtag('event', 'update_measure', {
                    old: this.currentMeasurement,
                    new: newMeasure,
                });
            },
            error: (error) => {
                this.disabled = false;
                this.loadingPost = false;
                this.svcNotification.warning({ message: error.error.status }),
                    this.googleAnalyticsService.exception('error_update_water_meter_measure', true);
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
