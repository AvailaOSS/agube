import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DwellingDetail, Resident } from '@availa/agube-rest-api';
import { WaterMeterType } from 'src/app/water-meter/water-meter-type.enum';
import { ChangeData } from '../person/change/change-data';
import { WaterMeterChangeDialogComponent } from 'src/app/water-meter/water-meter-change-dialog/water-meter-change-dialog.component';
import { WaterMeterChangeDialogData } from 'src/app/water-meter/water-meter-change-dialog/water-meter-change-dialog-data';
import { Type } from 'src/app/water-meter/water-meter/type';

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
  styleUrls: ['./card-management.component.scss'],
})
export class CardManagementComponent {
  @Input() dwellingDetail: DwellingDetail | undefined = undefined;
  public type: Type | undefined = undefined;
  public resident: Resident | undefined = undefined;
  public waterMeterId: number | undefined;

  @Output() waterMeterChangeEvent: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  constructor(private router: Router, public dialog: MatDialog) {}

  public loadWaterMeter(waterMeterId: number) {
    this.waterMeterId = waterMeterId;
    this.type = {
      id: this.dwellingDetail?.id!,
      type: WaterMeterType.DWELLING,
    };
  }

  public openChangeWaterMeter() {
    if (!this.waterMeterId) {
      return;
    }

    let data: WaterMeterChangeDialogData = {
      id: this.dwellingDetail?.id!,
      type: this.type?.type!,
    };
    const dialogRef = this.dialog.open(WaterMeterChangeDialogComponent, {
      hasBackdrop: true,
      width: '600px',
      disableClose: true,
      data,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.waterMeterChangeEvent.emit(true);
    });
  }

  public goToChangeResident() {
    let queryParams: ChangeData = {
      dwellingId: this.dwellingDetail?.id!,
    };
    this.router.navigate(['manager/dwellings/person/resident'], {
      queryParams,
    });
  }

  public goToChangeOwner() {
    this.router.navigate(['manager/dwellings/person/owner'], {
      queryParams: { dwellingId: this.dwellingDetail?.id },
    });
  }
}
