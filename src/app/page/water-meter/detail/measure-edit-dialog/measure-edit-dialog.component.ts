import { Component, HostListener, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeasurementService, WaterMeterMeasurement } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { set, getMinutes, getHours, format } from 'date-fns';
import { id } from 'date-fns/locale';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { MeasureDialogComponent } from '../measure-dialog/measure-dialog.component';
import { noFutureDate } from '../measure-dialog/no-future-date';
import { MeasureEditDialogData } from './measure-edit-dialog-data';

@Component({
	selector: 'app-measure-edit-dialog',
	templateUrl: '../measure-dialog/measure-dialog.component.html',
	styleUrls: ['../measure-dialog/measure-dialog.component.scss']
})
export class MeasureEditDialogComponent {
	public currentMeasurement: WaterMeterMeasurement | undefined;
	public measureForm: FormGroup;
	public measurement = new FormControl('', [Validators.required]);
	public date = new FormControl({value: new Date(), disabled: true}, [Validators.required, noFutureDate]);
	public hour = new FormControl({value: '', disabled: true}, [Validators.required]);
	public minutes = new FormControl({value: '', disabled: true}, [Validators.required]);

	// range for mat-select
	public hoursList = this.range(24);
	public minutesList = this.range(60);

	constructor(
		private formBuilder: FormBuilder,
		private readonly svcMeasurement: MeasurementService,
		public dialogRef: MatDialogRef<MeasureDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private data: MeasureEditDialogData,
		private svcNotification: NotificationService,
		private googleAnalyticsService: GoogleAnalyticsService
	) {
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

	public save(): void {
		// stop here if form is invalid
		if (this.measureForm.invalid || !this.currentMeasurement) {
			return;
		}

		let newMeasure = {
			id: this.currentMeasurement?.id!,
			measurement: this.measurement.value,
		}

		this.svcMeasurement.updateMeasurement(this.currentMeasurement?.id!, newMeasure).subscribe({
			next: (response) => {
				this.close(true);
				this.googleAnalyticsService.gtag('event', 'update_measure', {
					old: this.currentMeasurement,
					new: newMeasure,
				});
			},
			error: (error) => {
				this.svcNotification.warning({
					message: error.error.status
				}),
				this.googleAnalyticsService.exception('error_update_water_meter_measure', true);
			},
		});
	}

	public close(reload: boolean): void {
		this.dialogRef.close(reload);
	}

	@HostListener('window:keyup.esc') public onKeyUp() {
		this.close(false);
	}

	public saveAndClose() {
		this.save();
		this.close(false);
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

	private range(end: number) {
		return Array.from(Array(end).keys()).reverse();
	}



}
