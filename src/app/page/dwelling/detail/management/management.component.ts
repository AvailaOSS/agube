import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  DwellingCreate,
  ManagerService,
  DwellingService,
} from '@availa/agube-rest-api';
import { Type } from 'src/app/page/water-meter/detail/type';
import { WaterMeterDialogData } from 'src/app/page/water-meter/dialog/dialog-data';
import { WaterMeterDialogComponent } from 'src/app/page/water-meter/dialog/dialog.component';
import { WaterMeterPersistantService } from 'src/app/page/water-meter/water-meter-persistant.service';
import { WaterMeterType } from 'src/app/page/water-meter/water-meter-type.enum';
import { ChangeData } from '../../manager/person/change/change-data';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
  @Input() public dwelling: DwellingCreate | undefined;

  public load: boolean = false;

  public waterMeterId: number | undefined;

  public type: Type | undefined = undefined;

  constructor(
    private router: Router,
    private svcManager: ManagerService,
    private dialog: MatDialog,
    private svcDwelling: DwellingService,
    private svcPersistant: WaterMeterPersistantService
  ) {
    this.svcManager
      .userIsManager()
      .subscribe((response) => (this.load = response.is_manager));
  }

  ngOnInit(): void {
    if (!this.dwelling) {
      throw new Error('dwelling input is required');
    }

    this.svcDwelling
      .getCurrentDwellingWaterMeter(this.dwelling.id!)
      .subscribe((response) => {
        this.waterMeterId = response.id;
        this.svcPersistant.emitCode(response.code);
      });

    this.type = {
      id: this.dwelling?.id!,
      type: WaterMeterType.DWELLING,
    };
  }

  public openChangeWaterMeter() {
    let data: WaterMeterDialogData = {
      id: this.dwelling?.id!,
      type: this.type?.type!,
    };
    const dialogRef = this.dialog.open(WaterMeterDialogComponent, {
      hasBackdrop: true,
      width: '600px',
      disableClose: true,
      data,
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.waterMeterChangeEvent.emit(true);
    // });
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
