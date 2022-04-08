import { Component, HostListener, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@availa/notification';
import { WaterMeterPersistantService } from '../water-meter-persistant.service';
import { WaterMeterType } from '../water-meter-type.enum';
import { WaterMeterManager } from '../water-meter.manager';
import { WaterMeterChangeDialogData } from './water-meter-change-dialog-data';

@Component({
  selector: 'app-water-meter-change-dialog',
  templateUrl: './water-meter-change-dialog.component.html',
  styleUrls: ['./water-meter-change-dialog.component.scss'],
})
export class WaterMeterChangeDialogComponent {
  public id: number = -1;
  public type: WaterMeterType = WaterMeterType.UNKNOWN;
  public waterMeterForm: FormGroup;
  public code = new FormControl('', [Validators.required]);

  public currentCode: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<WaterMeterChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: WaterMeterChangeDialogData,
    private svcNotification: NotificationService,
    private svcWaterMeterManager: WaterMeterManager,
    private svcPersistant: WaterMeterPersistantService
  ) {
    this.id = data.id;
    this.type = data.type;
    this.waterMeterForm = this.formBuilder.group({
      code: this.code,
    });

    this.svcPersistant.getCode().subscribe((response) => {
      if (response) {
        this.currentCode = response;
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
        next: () => {
          this.svcPersistant.emitReload(true);
          this.close();
        },
        error: (error: any) => this.svcNotification.warning({ message: error }),
      });
  }

  public close(): void {
    this.dialogRef.close();
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.close();
  }

  public errorValidator(entity: string) {
    switch (entity) {
      case 'code':
        if (this.code.hasError('required')) {
          return 'WATER_METER.DIALOG.FORM.NEW_WATER_METER.VALIDATION';
        }
        return '';
      default:
        return '';
    }
  }
}
