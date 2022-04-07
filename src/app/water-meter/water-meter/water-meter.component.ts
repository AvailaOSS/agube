import { Component, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MeasureDialogComponent } from './measure-dialog/measure-dialog.component';
import { WaterMeterDialogData } from './measure-dialog/water-meter-dialog-data';
import { WaterMeterManager } from '../water-meter.manager';
import {
  WaterMeterMeasurement,
  WaterMeterWithMeasurements,
} from '@availa/agube-rest-api';
import { Type } from './type';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-water-meter',
  templateUrl: './water-meter.component.html',
  styleUrls: ['./water-meter.component.scss'],
})
export class WaterMeterComponent implements OnChanges {
  @Input() public waterMeterId: number | undefined;
  @Input() public type: Type | undefined;

  public displayedColumns: string[] = ['measurement', 'date'];
  public dataSource: MatTableDataSource<
    WaterMeterMeasurement
  > = new MatTableDataSource<WaterMeterMeasurement>();

  public filter = new FormControl('');

  //FIXME: select chunk from configuration management
  private chunk: number = 5; //FIXME: This is a input

  constructor(
    private svcWaterMeterManager: WaterMeterManager,
    public dialog: MatDialog
  ) {}

  ngOnChanges(): void {
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
    let data: WaterMeterDialogData = {
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

  private loadWaterMeterMeasures() {
    if (!this.type?.id!) {
      return;
    }

    this.svcWaterMeterManager
      .getChunk(this.type?.id!, this.chunk, this.type?.type)
      .subscribe({
        next: (response: WaterMeterWithMeasurements) => {
          if (!response) {
            return;
          }
          this.dataSource = new MatTableDataSource(response.measures);
        },
        error: (error: any) => {
          this.dataSource = new MatTableDataSource();
        },
      });
  }
}
