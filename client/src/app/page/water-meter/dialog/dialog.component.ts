import { ReservoirCacheService } from './../../../utils/cache/reservoir-cache.service';
import { Component, HostListener, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WaterMeter } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { DwellingCacheService } from 'src/app/utils/cache/dwelling-cache.service';
import { WaterMeterPersistantService } from '../water-meter-persistant.service';
import { WaterMeterType } from '../water-meter-type.enum';
import { WaterMeterManager } from '../water-meter.manager';
import { WaterMeterDialogData } from './dialog-data';

@Component({
    selector: 'app-water-meter-dialog',
    styleUrls: ['./dialog.component.scss'],
    templateUrl: './dialog.component.html',
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
        private svcPersistantWaterMeter: WaterMeterPersistantService,
        private svcDwellingCache: DwellingCacheService,
        private svcReservoirCache: ReservoirCacheService
    ) {
        this.id = data.id;
        this.type = data.type;
        this.waterMeterForm = this.formBuilder.group({
            code: this.code,
        });

        this.svcPersistantWaterMeter.get().subscribe((response) => {
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
                    this.svcPersistantWaterMeter.emit(response);
                    this.close();
                },
                error: (error: any) => this.svcNotification.warning({ message: error }),
            });
    }

    public close(): void {
        switch (this.type) {
            case WaterMeterType.DWELLING:
                this.svcDwellingCache.clean();
                break;
            case WaterMeterType.RESERVOIR:
                this.svcReservoirCache.clean();
                break;
            default:
                break;
        }
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
