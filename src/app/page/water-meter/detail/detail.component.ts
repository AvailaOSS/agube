import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MeasureDialogComponent } from './measure-dialog/measure-dialog.component';
import { MeasureDialogData } from './measure-dialog/measure-dialog-data';
import { WaterMeterManager } from '../water-meter.manager';
import { ManagerService, WaterMeterMeasurement, WaterMeterWithMeasurements } from '@availa/agube-rest-api';
import { Type } from './type';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { WaterMeterPersistantService } from '../water-meter-persistant.service';
import { WaterMeterGauge } from '../gauge/water-meter-gauge';
import { differenceInDays, isBefore } from 'date-fns';

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

    public displayedColumns: string[] = ['measurement', 'date', 'overflow'];
    public dataSource: MatTableDataSource<WaterMeterMeasurement> = new MatTableDataSource<WaterMeterMeasurement>();

    public maxDailyConsumption: number | undefined;

    public filter = new FormControl('');

    public chunks = ['5', '10', '15'];
    public chunk: string = this.chunks[0];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private svcWaterMeterManager: WaterMeterManager,
        public dialog: MatDialog,
        private svcManager: ManagerService,
        private svcPersistance: WaterMeterPersistantService
    ) {}

    ngOnInit(): void {
        this.svcManager
            .getManagerConfiguration()
            .subscribe((response) => (this.maxDailyConsumption = +response.max_daily_consumption));
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
                this.ngOnInit();
            }
        });
    }

    public isOverflow(current: WaterMeterMeasurement, data: WaterMeterMeasurement[]) {
        const measure = this.minusMeasure(current, data);
        if (this.maxDailyConsumption && measure > this.maxDailyConsumption) {
            return true;
        } else {
            return false;
        }
    }

    public minusMeasure(current: WaterMeterMeasurement, data: WaterMeterMeasurement[]): number {
        let currentDate = new Date(current.date!);

        const previousWaterMeterMeasurement = data.filter(
            (x) => isBefore(new Date(x.date!), currentDate) && differenceInDays(new Date(x.date!), currentDate) < 0
        )[0];

        if (!previousWaterMeterMeasurement) {
            return 0;
        }

        let lapsedDays = differenceInDays(new Date(current.date!), new Date(previousWaterMeterMeasurement.date!));

        if (lapsedDays === 0) {
            lapsedDays = 1;
        }

        return (+(+current.measurement - +previousWaterMeterMeasurement.measurement).toFixed(3) * 1000) / lapsedDays;
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
