import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DwellingCreate, ReservoirCreate } from '@availa/agube-rest-api';
import { ChangeData } from 'src/app/page/person/change/change-data';
import { WaterMeterDialogData } from 'src/app/page/water-meter/dialog/dialog-data';
import { WaterMeterDialogComponent } from 'src/app/page/water-meter/dialog/dialog.component';
import { Type } from '../../page/water-meter/detail/type';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent {
  @Input() public manage: DwellingCreate | ReservoirCreate | undefined;
  @Input() public waterMeterId: number | undefined;
  @Input() public type: Type | undefined;
  @Input() public load: boolean = false;
  @Input() public reservoir?: boolean = false;

  constructor(private router: Router, private dialog: MatDialog) {}

  public openChangeWaterMeter() {
    let data: WaterMeterDialogData = {
      id: this.manage?.id!,
      type: this.type?.type!,
    };
    this.dialog.open(WaterMeterDialogComponent, {
      hasBackdrop: true,
      width: '600px',
      disableClose: true,
      data,
    });
  }

  public goToChangeResident() {
    let queryParams: ChangeData = {
      dwellingId: this.manage?.id!,
    };
    this.router.navigate(['manager/dwellings/person/resident'], {
      queryParams,
    });
  }

  public goToChangeOwner() {
    this.router.navigate(['manager/dwellings/person/owner'], {
      queryParams: { dwellingId: this.manage?.id },
    });
  }
}
