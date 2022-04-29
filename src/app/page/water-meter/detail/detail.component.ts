import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MeasureDialogComponent } from './measure-dialog/measure-dialog.component';
import { MeasureDialogData } from './measure-dialog/measure-dialog-data';
import { WaterMeterManager } from '../water-meter.manager';
import {
  ManagerConfiguration,
  ManagerService,
  WaterMeterMeasurement,
  WaterMeterWithMeasurements,
} from '@availa/agube-rest-api';
import { Type } from './type';
import { FormControl } from '@angular/forms';
import { GoogleChartConfigure } from 'src/app/components/chart/google-chart-configure';

@Component({
  selector: 'app-water-meter-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnChanges {
  @Input() public waterMeterId: number | undefined;
  @Input() public type: Type | undefined;
  @Input() public canAddReading: boolean | undefined;

  public displayedColumns: string[] = ['measurement', 'date'];
  public dataSource: MatTableDataSource<
    WaterMeterMeasurement
  > = new MatTableDataSource<WaterMeterMeasurement>();

  public filter = new FormControl('');

  public chartGoogleConsume!: GoogleChartConfigure;

  //FIXME: select chunk from configuration management
  private chunk: number = 5; //FIXME: This is a input

  private static options = {
    width: 500,
    height: 200,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 70,
    yellowTo: 90,
    minorTicks: 10,
  };

  constructor(
    private svcWaterMeterManager: WaterMeterManager,
    public dialog: MatDialog,
    private svcManager: ManagerService
  ) {}

  ngOnInit(): void {
    this.svcWaterMeterManager
      .getChunk(this.type!.id, this.chunk, this.type!.type)
      .subscribe(
        (responseWaterMeterMeasurement: WaterMeterWithMeasurements) => {
          if (!responseWaterMeterMeasurement) {
            return;
          }
          this.svcManager.getManagerConfiguration().subscribe((response) => {
            this.configureWaterMeterCharts(
              responseWaterMeterMeasurement,
              response
            );
          });
        }
      );
  }

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

  private configureWaterMeterCharts(
    waterMeterMeasurement: WaterMeterWithMeasurements,
    consumeToday: ManagerConfiguration
  ) {
    let sum = 0;
    for (let i = 0; i < waterMeterMeasurement.measures.length; i++) {
      sum += +waterMeterMeasurement.measures[i].measurement;
    }

    this.chartGoogleConsume = {
      id: String(waterMeterMeasurement.id!),
      options: {
        height: DetailComponent.options.height,
        minorTicks: DetailComponent.options.minorTicks,
        width: DetailComponent.options.width,
        yellowFrom: 60,
        redFrom: 90,
        redTo: 100,
        yellowTo: 90,
      },

      arrayToDataTable: [
        {
          code: waterMeterMeasurement.code!,
          discharge_date: waterMeterMeasurement.discharge_date,
          release_date: waterMeterMeasurement.release_date,
          water_meter_measurement: waterMeterMeasurement,
          water_meter_measurementConsume: sum,
          consumeToday,
        },
      ],
    };
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
