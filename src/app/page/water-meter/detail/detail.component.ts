import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WaterMeterMeasurement, WaterMeterWithMeasurements } from '@availa/agube-rest-api';
import { WaterMeterGauge } from '../gauge/water-meter-gauge';
import { WaterMeterPersistantService } from '../water-meter-persistant.service';
import { WaterMeterManager } from '../water-meter.manager';
import { MeasureDialogData } from './measure-dialog/measure-dialog-data';
import { MeasureDialogComponent } from './measure-dialog/measure-dialog.component';
import { Type } from './type';

@Component({
    selector: 'app-water-meter-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
    @Input() public waterMeterId: number | undefined;
    @Input() public type: Type | undefined;
    @Input() public canAddReading: boolean | undefined;

    public waterMeter: WaterMeterGauge | undefined;
    public waterMeterCode: string | undefined;

    public displayedColumns: string[] = ['measurement', 'date', 'measurement_diff'];
    public dataSource: MatTableDataSource<WaterMeterMeasurement> = new MatTableDataSource<WaterMeterMeasurement>();


    public filter = new FormControl('');

    public chunks = ['5', '10', '15'];
    public chunk: string = this.chunks[0];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        protected svcWaterMeterManager: WaterMeterManager,
        public dialog: MatDialog,
        protected svcPersistance: WaterMeterPersistantService
    ) {}

    ngOnInit(): void {
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
                this.ngOnInit();
            }
        });
    }

    public isOverflow(measure: WaterMeterMeasurement) {
        if (measure.measurement_diff && measure.max_daily_consumption && measure.measurement_diff > measure.max_daily_consumption) {
            return true;
        } else {
            return false;
        }
    }

    public loadWaterMeterMeasures() {
        if (!this.type?.id!) {
            return;
        }

        this.svcWaterMeterManager.getChunk(this.type?.id!, +this.chunk, this.type?.type).subscribe({
            next: (response: WaterMeterWithMeasurements) => {
                if (!response) {
                    return;
                }
                this.svcPersistance.get().subscribe((waterMeter) => {
                    this.waterMeter = {
                        waterMeter: waterMeter!,
                        waterMeterWithMeasure: response,
                    };
                });
                this.dataSource = new MatTableDataSource(response.measures);
                this.dataSource.paginator = this.paginator!;
            },
            error: (error: any) => {
                this.dataSource = new MatTableDataSource();
                this.dataSource.paginator = this.paginator!;
            },
        });
    }
}
