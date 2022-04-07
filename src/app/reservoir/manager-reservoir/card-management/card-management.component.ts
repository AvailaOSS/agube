import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservoirCreate, ReservoirDetail } from '@availa/agube-rest-api';
import { WaterMeterChangeDialogData } from 'src/app/water-meter/water-meter-change-dialog/water-meter-change-dialog-data';
import { WaterMeterChangeDialogComponent } from 'src/app/water-meter/water-meter-change-dialog/water-meter-change-dialog.component';
import { WaterMeterType } from 'src/app/water-meter/water-meter-type.enum';
import { Type } from 'src/app/water-meter/water-meter/type';

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
  styleUrls: ['./card-management.component.scss'],
})
export class CardManagementComponent {
  @Input() reservoirDetail: ReservoirDetail | undefined = undefined;

  public waterMeterId: number | undefined;
  public type: Type | undefined = undefined;

  constructor(public dialog: MatDialog) {}

  loadWaterMeter(waterMeterId: number) {
    this.waterMeterId = waterMeterId;
    this.type = {
      id: this.reservoirDetail?.id!,
      type: WaterMeterType.RESERVOIR,
    };
  }

  openChangeWaterMeter() {
    if (!this.waterMeterId) {
      return;
    }

    let data: WaterMeterChangeDialogData = {
      id: this.reservoirDetail?.id!,
      type: this.type!.type,
    };
    const dialogRef = this.dialog.open(WaterMeterChangeDialogComponent, {
      hasBackdrop: true,
      width: '600px',
      disableClose: true,
      data,
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}
