import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WaterMeterMeasurement, WaterMeterWithMeasurements } from '@availa/agube-rest-api';
import { WaterMeterMeasurementsPagination } from '@availa/agube-rest-api/lib/model/waterMeterMeasurementsPagination';
import { NotificationService } from '@availa/notification';
import { format, differenceInHours, parseISO, differenceInMinutes, differenceInDays } from 'date-fns';
import { WaterMeterGauge } from '../gauge/water-meter-gauge';
import { WaterMeterPersistantService } from '../water-meter-persistant.service';
import { WaterMeterManager } from '../water-meter.manager';
import { DateMeasurementFilter } from './date-measurement-filter';
import { GetPropertiesService } from './get-propierties.service';
import { MeasureDialogData } from './measure-dialog/measure-dialog-data';
import { MeasureDialogComponent } from './measure-dialog/measure-dialog.component';
import { MeasureEditDialogData } from './measure-edit-dialog/measure-edit-dialog-data';
import { MeasureEditDialogComponent } from './measure-edit-dialog/measure-edit-dialog.component';
import { Type } from './type';

@Component({
    selector: 'app-water-meter-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
    @Input() public waterMeterId: number | undefined;
    @Input() public reservoirId: number | undefined;
    @Input() public dwellingId: number | undefined;
    @Input() public type: Type | undefined;
    @Input() public canAddReading: boolean | undefined;

    public chunks = ['5', '10', '15'];
    public chunk: string = this.chunks[0];
    public displayedColumns: string[] = ['measurement', 'date', 'daysApart', 'measurement_diff'];
    public dateStart = new FormControl();
    public dateEnd = new FormControl();
    public dataSource: MatTableDataSource<WaterMeterMeasurement> = new MatTableDataSource<WaterMeterMeasurement>();
    public filter = new FormControl('');
    public noData: boolean = false;
    public noDataSource: boolean = false;
    public next: string = '';
    public previous: string = '';
    public properties: any;
    public page: number | undefined;
    public pageIndex: number | undefined = 1;
    public waterMeter: WaterMeterGauge | undefined;
    public waterMeterCode: string | undefined;
    public waterResults: WaterMeterWithMeasurements | undefined;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    private readonly measureAllowEdit: number = 24;

    constructor(
        protected svcWaterMeterManager: WaterMeterManager,
        public dialog: MatDialog,
        protected svcPersistance: WaterMeterPersistantService,
        public propertiesServices: GetPropertiesService,
        public svcNotification: NotificationService
    ) {}

    public ngOnInit(): void {
        this.loadWaterMeterMeasures();
        this.svcPersistance.get().subscribe((waterMeter) => {
            this.waterResults = {
                measures: [],
            };

            this.waterMeter = {
                waterMeter: waterMeter!,
                dwellingId:this.dwellingId,
                waterMeterWithMeasure: this.waterResults,
            };
        });
    }

    public computeDaysApart(measurement: WaterMeterMeasurement, index: number): number {
        let previousMeasurement = this.dataSource.data[index + 1]

        if (!previousMeasurement) {
            return 0
        }

        let current = new Date(measurement.date!);
        let previous = new Date(previousMeasurement.date!);

        let diff = differenceInDays(current, previous);
        if (diff <= 0) {
            return Math.round(differenceInMinutes(current, previous) / 60 / 24 * 100) / 100
        }
        return diff;
    }

    public applyFilter() {
        this.dataSource.filter = this.filter.value.trim().toLowerCase();
    }

      public openEditMeasureDialog() {

        let data: MeasureEditDialogData = {
            currentMeasurement: this.dataSource.data[0],
        };

        const dialogRef = this.dialog.open(MeasureEditDialogComponent, {
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

    public clearFilter() {
        this.dateStart.setValue(null);
        this.loadWaterMeterMeasures();
    }
    public clearFilterEnd() {
        this.dateEnd.setValue(null);
        this.loadWaterMeterMeasures();
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
                this.svcPersistance.emit(this.waterMeter!.waterMeter);
            }
        });
    }

    public isMeasurementEditable(measure: WaterMeterMeasurement) {

        if (!measure.date) {
            return;
        }

        const difference = differenceInHours(
            new Date(),
            parseISO(String(measure.date))
        );

        if (this.measureAllowEdit > difference) {
            return true;
        } else {
            return false;
        }
    }

    public isOverflow(measure: WaterMeterMeasurement) {
        if (
            measure.measurement_diff &&
            measure.max_daily_consumption &&
            measure.measurement_diff > measure.max_daily_consumption
        ) {
            return true;
        } else {
            return false;
        }
    }

    public setProperties(url: string) {
        this.propertiesServices.getProperties(url).subscribe((response) => {
            this.dataSource = new MatTableDataSource(response.results);
            this.dataSource.paginator = this.paginator!;
            this.page = response.num_pages;

            if (response.links.next) {
                // set the components next property here from the response
                this.next = response.links.next;
            }
            if (response.links.previous) {
                // set the components previous property here from the response
                this.previous = response.links.previous;
            }
        });
    }
    // function fetches the next paginated items by using the url in the next property
    public fetchNext(index: number) {
        this.setProperties(this.next);
        if (index >= this.page!) {
            this.pageIndex = this.page;
        } else {
            this.pageIndex! += 1;
        }
    }
    // function fetches the previous paginated items by using the url in the previous property
    public fetchPrevious(index: number) {
        this.setProperties(this.previous);
        if (index === 1) {
            this.pageIndex! = 1;
        } else {
            this.pageIndex! -= 1;
        }
    }
    public formatDate(date: any): string {
        return (date = format(date, 'yyyy-MM-dd'));
    }

    public sendDateFormat(date: DateMeasurementFilter): DateMeasurementFilter {
        if (this.dateStart.value !== null && this.dateEnd.value === null) {
            return (date = {
                dateStart: this.formatDate(this.dateStart.value),
                dateEnd: this.formatDate(new Date()),
            });
        }

        if (this.dateStart.value === null && this.dateEnd.value !== null) {
            return (date = {
                dateStart: '2022-01-01',
                dateEnd: this.formatDate(this.dateEnd.value),
            });
        }
        if (this.dateStart.value !== null && this.dateEnd.value !== null) {
            return (date = {
                dateStart: this.formatDate(this.dateStart.value),

                dateEnd: this.formatDate(this.dateEnd.value),
            });
        }
        return date;
    }
    public loadWaterMeterMeasures() {
        let date: DateMeasurementFilter = {};
        if (!this.type?.id!) {
            return;
        }
        this.noData = false;

        if (this.dateStart.value !== null) {
            if (this.formatDate(this.dateStart.value) >= this.formatDate(new Date())) {
                this.noData = true;
                this.noDataSource = false;
            }
            if (this.dateEnd.value !== null) {
                if (this.formatDate(this.dateStart.value) >= this.formatDate(this.dateEnd.value)) {
                    this.noData = true;
                    this.noDataSource = false;
                }
            }
        }
        date = this.sendDateFormat(date);
        this.svcWaterMeterManager.getChunk(this.type?.id!, +this.chunk, date, this.type?.type).subscribe({
            next: (response: WaterMeterMeasurementsPagination) => {
                if (!response) {
                    return;
                }
                if (response.results.length === 0) {
                    this.noDataSource = true;
                    this.noData = false;
                    return;
                }
                this.previous = response.links!.previous!;
                this.next = response.links!.next!;
                this.page = response.num_pages;
                this.pageIndex = 1;
                this.noDataSource = false;
                this.noData = false;
                this.dataSource = new MatTableDataSource(response.results);
                this.dataSource.paginator = this.paginator!;
                this.svcPersistance.get().subscribe((waterMeter) => {
                    this.waterResults = {
                        measures: response.results,
                    };
                    this.waterMeter = {
                        waterMeter: waterMeter!,
                        dwellingId: this.dwellingId,
                        waterMeterWithMeasure: this.waterResults,
                    };
                });
            },
            error: (error: any) => {
                this.noData = true;
                this.dataSource = new MatTableDataSource();
                this.dataSource.paginator = this.paginator!;
            },
        });
    }
}
