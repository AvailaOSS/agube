import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DwellingCreate, ManagerService } from '@availa/agube-rest-api';
import { Type } from 'src/app/page/water-meter/detail/type';
import { WaterMeterDialogData } from 'src/app/page/water-meter/dialog/dialog-data';
import { WaterMeterDialogComponent } from 'src/app/page/water-meter/dialog/dialog.component';
import { ChangeData } from '../../manager/person/change/change-data';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent {
  @Input() public dwelling: DwellingCreate | undefined;
  @Input() public waterMeterId: number | undefined;
  @Input() public type: Type | undefined;
  @Input() public load: boolean = false;

  constructor(private router: Router, private dialog: MatDialog) {}

  public openChangeWaterMeter() {
    let data: WaterMeterDialogData = {
      id: this.dwelling?.id!,
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
      dwellingId: this.dwelling?.id!,
    };
    this.router.navigate(['manager/dwellings/person/resident'], {
      queryParams,
    });
  }

  public goToChangeOwner() {
    this.router.navigate(['manager/dwellings/person/owner'], {
      queryParams: { dwellingId: this.dwelling?.id },
    });
  }
}
