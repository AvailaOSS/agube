import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservoirDetail } from '@availa/agube-rest-api';
import { Type } from 'src/app/page/water-meter/detail/type';
import { WaterMeterDialogData } from 'src/app/page/water-meter/dialog/dialog-data';
import { WaterMeterDialogComponent } from 'src/app/page/water-meter/dialog/dialog.component';
import { WaterMeterType } from 'src/app/page/water-meter/water-meter-type.enum';

@Component({
  selector: 'app-page-reservoir-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent {
  @Input() reservoirDetail: ReservoirDetail | undefined = undefined;

  public waterMeterId: number | undefined;
  public type: Type | undefined = undefined;

  constructor(public dialog: MatDialog) {}

  public loadWaterMeter(waterMeterId: number) {
    this.waterMeterId = waterMeterId;
    this.type = {
      id: this.reservoirDetail?.id!,
      type: WaterMeterType.RESERVOIR,
    };
  }

  public openChangeWaterMeter() {
    if (!this.waterMeterId) {
      return;
    }

    let data: WaterMeterDialogData = {
      id: this.reservoirDetail?.id!,
      type: this.type!.type,
    };
    const dialogRef = this.dialog.open(WaterMeterDialogComponent, {
      hasBackdrop: true,
      width: '600px',
      disableClose: true,
      data,
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}
