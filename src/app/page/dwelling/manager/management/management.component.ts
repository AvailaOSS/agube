import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DwellingDetail, Resident } from '@availa/agube-rest-api';
import { WaterMeterType } from 'src/app/page/water-meter/water-meter-type.enum';
import { ChangeData } from '../person/change/change-data';
import { WaterMeterDialogComponent } from 'src/app/page/water-meter/dialog/dialog.component';
import { WaterMeterDialogData } from 'src/app/page/water-meter/dialog/dialog-data';
import { Type } from 'src/app/page/water-meter/detail/type';

@Component({
  selector: 'app-dwelling-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent {
  @Input() dwellingDetail: DwellingDetail | undefined = undefined;
  public type: Type | undefined = undefined;
  public resident: Resident | undefined = undefined;
  public waterMeterId: number | undefined;

  @Output() waterMeterChangeEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(private router: Router, public dialog: MatDialog) {}

  public loadWaterMeter(waterMeterId: number) {
    this.waterMeterId = waterMeterId;
    this.type = {
      id: this.dwellingDetail?.id!,
      type: WaterMeterType.DWELLING,
    };
  }

  public goToDwellingDetail() {
    this.router.navigate(['/manager/home/manager/client/dwellings/detail'], {
      queryParams: { dwellingId: this.dwellingDetail?.id },
    });
  }

  public openChangeWaterMeter() {
    if (!this.waterMeterId) {
      return;
    }

    let data: WaterMeterDialogData = {
      id: this.dwellingDetail?.id!,
      type: this.type?.type!,
    };
    const dialogRef = this.dialog.open(WaterMeterDialogComponent, {
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
