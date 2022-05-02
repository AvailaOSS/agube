import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MeasureDialogComponent } from './measure-dialog/measure-dialog.component';
import { MeasureDialogData } from './measure-dialog/measure-dialog-data';
import { WaterMeterManager } from '../water-meter.manager';
import {
  ManagerService,
  WaterMeterMeasurement,
  WaterMeterWithMeasurements,
} from '@availa/agube-rest-api';
import { Type } from './type';
import { FormControl } from '@angular/forms';
import { differenceInDays } from 'date-fns';

@Component({
  selector: 'app-water-meter-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() public waterMeterId: number | undefined;
  @Input() public type: Type | undefined;
  @Input() public canAddReading: boolean | undefined;

  public waterMeter: WaterMeterWithMeasurements | undefined;

  public displayedColumns: string[] = ['measurement', 'date', 'overflow'];
  public dataSource: MatTableDataSource<
    WaterMeterMeasurement
  > = new MatTableDataSource<WaterMeterMeasurement>();

  public maxDailyConsumption: number | undefined;

  public filter = new FormControl('');

  public chunks = ['5', '10', '15'];
  public chunk: string = this.chunks[0];

  constructor(
    private svcWaterMeterManager: WaterMeterManager,
    public dialog: MatDialog,
    private svcManager: ManagerService
  ) {}

  ngOnInit(): void {
    this.svcManager
      .getManagerConfiguration()
      .subscribe(
        (response) =>
          (this.maxDailyConsumption = +response.max_daily_consumption)
      );
    this.loadWaterMeterMeasures();
  }

  public applyFilter() {
    this.dataSource.filter = this.filter.value.trim().toLowerCase();
  }

  public clearFilter() {
    this.filter.setValue('');
    this.dataSource.filter = '';
  }

  public openMeasureDialog() {
    if (!this.waterMeterId) {
      return;
    }
    let data: MeasureDialogData = {
      waterMeterId: this.waterMeterId,
      lastMeasurement: this.dataSource.data[0],
    };
    const dialogRef = this.dialog.open(MeasureDialogComponent, {
      hasBackdrop: true,
      width: '600px',
      disableClose: true,
      data,
    });

    dialogRef.afterClosed().subscribe((reload) => {
      if (reload) {
        this.loadWaterMeterMeasures();
      }
    });
  }

  public isOverflow(
    current: WaterMeterMeasurement,
    old: WaterMeterMeasurement
  ) {
    const measure = this.minusMeasure(current, old);
    if (this.maxDailyConsumption && measure > this.maxDailyConsumption) {
      return true;
    } else {
      return false;
    }
  }

  public minusMeasure(
    current: WaterMeterMeasurement,
    old: WaterMeterMeasurement
  ): number {
    if (!old) {
      old = current;
    }

    let lapsedDays = differenceInDays(
      new Date(current.date!),
      new Date(old.date!)
    );

    if (lapsedDays === 0) {
      lapsedDays = 1;
    }

    return (
      (+(+current.measurement - +old.measurement).toFixed(3) * 1000) /
      lapsedDays
    );
  }

  public loadWaterMeterMeasures() {
    if (!this.type?.id!) {
      return;
    }

    this.svcWaterMeterManager
      .getChunk(this.type?.id!, +this.chunk, this.type?.type)
      .subscribe({
        next: (response: WaterMeterWithMeasurements) => {
          if (!response) {
            return;
          }
          this.waterMeter = response;
          this.dataSource = new MatTableDataSource(response.measures);
        },
        error: (error: any) => {
          this.dataSource = new MatTableDataSource();
        },
      });
  }
}
