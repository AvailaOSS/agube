import { Component, HostListener, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WaterMeter } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { WaterMeterPersistantService } from '../water-meter-persistant.service';
import { WaterMeterType } from '../water-meter-type.enum';
import { WaterMeterManager } from '../water-meter.manager';
import { WaterMeterDialogData } from './dialog-data';

@Component({
    selector: 'app-water-meter-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class WaterMeterDialogComponent {
    public id: number = -1;
    public type: WaterMeterType = WaterMeterType.UNKNOWN;
    public waterMeterForm: FormGroup;
    public code = new FormControl('', [Validators.required]);

    public currentCode: string = '';

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<WaterMeterDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: WaterMeterDialogData,
        private svcNotification: NotificationService,
        private svcWaterMeterManager: WaterMeterManager,
        private svcPersistant: WaterMeterPersistantService
    ) {
        this.id = data.id;
        this.type = data.type;
        this.waterMeterForm = this.formBuilder.group({
            code: this.code,
        });

        this.svcPersistant.get().subscribe((response) => {
            if (response) {
                this.currentCode = response.code;
            }
        });
    }

    public save(): void {
        // stop here if form is invalid
        if (this.waterMeterForm.invalid) {
            return;
        }

        this.svcWaterMeterManager
            .change(
                this.id,
                {
                    code: this.code.value,
                },
                this.type
            )
            .subscribe({
                next: (response: WaterMeter) => {
                    this.svcPersistant.emit(response);

                    this.close();
                    window.location.reload();
                },
                error: (error: any) => this.svcNotification.warning({ message: error }),
            });
    }

    public close(): void {
        this.dialogRef.close();
    }

    @HostListener('window:keyup.esc') public onKeyUp() {
        this.close();
    }

    public errorValidator(entity: string) {
        switch (entity) {
            case 'code':
                if (this.code.hasError('required')) {
                    return 'PAGE.WATER_METER.DIALOG.NEW_WATER_METER.VALIDATION';
                }
                return '';
            default:
                return '';
        }
    }
}
